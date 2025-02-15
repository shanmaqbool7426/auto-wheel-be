import asyncHandler from 'express-async-handler';
import Faq from './model.js';
import response from '../Utils/response.js';

// Create FAQ
export const createFaq = asyncHandler(async (req, res) => {
  const { question, answer, type } = req.body;

  if (!['car', 'bike', 'truck'].includes(type)) {
    return response.badRequest(res, 'Invalid vehicle type. Must be car, bike, or truck');
  }

  // Check if question already exists for this vehicle type
  const existingFaq = await Faq.findOne({ 
    question: { $regex: new RegExp(`^${question}$`, 'i') },
    type
  });

  if (existingFaq) {
    return response.conflict(res, `This question already exists for ${type} type`);
  }

  const faq = await Faq.create({
    question,
    answer,
    type
  });

  return response.created(res, 'FAQ created successfully', faq);
});

// Get exact answer for a specific question
export const getAnswerForQuestion = asyncHandler(async (req, res) => {
  const { question, type } = req.query;

  if (!question || !type) {
    return response.badRequest(res, 'Question and vehicle type are required');
  }

  if (!['car', 'bike', 'truck'].includes(type)) {
    return response.badRequest(res, 'Invalid vehicle type. Must be car, bike, or truck');
  }

  // Find exact match for the question (case-insensitive) for specific vehicle type
  const faq = await Faq.findOne({
    question: { $regex: new RegExp(`^${question}$`, 'i') },
    type,
    status: true
  });

  if (!faq) {
    return response.notFound(res, `No answer found for this question in ${type} category`);
  }

  return response.ok(res, 'Answer found', {
    question: faq.question,
    answer: faq.answer,
    type: faq.type,
    status: faq.status
  });
});

// Get all FAQs with type filter
export const getFaqs = asyncHandler(async (req, res) => {
  const { 
    type,
    page = 1, 
    limit = 10
  } = req.query;

  const query = { status: true };
  
  if (type) {
    if (!['car', 'bike', 'truck'].includes(type)) {
      return response.badRequest(res, 'Invalid vehicle type. Must be car, bike, or truck');
    }
    query.type = type;
  }

  try {
    const [faqs, totalCount] = await Promise.all([
      Faq.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('question answer type status'),
      Faq.countDocuments(query)
    ]);

    return response.ok(res, 'FAQs retrieved successfully', {
      data: faqs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount
      }
    });
  } catch (error) {
    return response.serverError(res, 'Error retrieving FAQs');
  }
});

// Update FAQ
export const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer, type, status } = req.body;

  if (type && !['car', 'bike', 'truck'].includes(type)) {
    return response.badRequest(res, 'Invalid vehicle type. Must be car, bike, or truck');
  }

  // Check if new question already exists for the same vehicle type (excluding current FAQ)
  if (question && type) {
    const existingFaq = await Faq.findOne({
      _id: { $ne: id },
      question: { $regex: new RegExp(`^${question}$`, 'i') },
      type
    });

    if (existingFaq) {
      return response.conflict(res, `This question already exists for ${type} type`);
    }
  }

  const faq = await Faq.findByIdAndUpdate(
    id,
    { question, answer, type, status },
    { new: true }
  );

  if (!faq) {
    return response.notFound(res, 'FAQ not found');
  }

  return response.ok(res, 'FAQ updated successfully', faq);
});

// Delete FAQ
export const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const faq = await Faq.findByIdAndDelete(id);

  if (!faq) {
    return response.notFound(res, 'FAQ not found');
  }

  return response.ok(res, 'FAQ deleted successfully');
});