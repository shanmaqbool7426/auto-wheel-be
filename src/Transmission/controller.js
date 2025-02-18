const Transmission = require("./model");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { title, vehicleType, order } = req.body;
    const exists = await Transmission.findOne({ title });
    if (exists) {
      return res.status(400).json({ message: "Transmission already exists" });
    }

    // If no order provided, set as last
    const lastOrder = await Transmission.findOne({}).sort({ order: -1 });
    const nextOrder = order || (lastOrder ? lastOrder.order + 1 : 1);

    const transmission = await new Transmission({
      title,
      vehicleType,
      slug: slugify(title),
      order: nextOrder
    }).save();

    res.status(201).json({
      success: true,
      message: "Transmission Created Successfully",
      transmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Creating Transmission",
      error: error.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const transmissions = await Transmission.find({})
      .sort({ order: 1, createdAt: -1 })
      .exec();
    res.status(200).json({
      success: true,
      message: "All Transmissions List",
      transmissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting Transmissions",
      error: error.message,
    });
  }
};

exports.read = async (req, res) => {
  try {
    const transmission = await Transmission.findOne({ slug: req.params.slug });
    if (!transmission) {
      return res.status(404).json({
        success: false,
        message: "Transmission not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Transmission fetched Successfully",
      transmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting Transmission",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, vehicleType, order } = req.body;
    const transmission = await Transmission.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        vehicleType,
        slug: slugify(title),
        ...(order && { order })
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Transmission Updated Successfully",
      transmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating Transmission",
      error: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const transmission = await Transmission.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(200).json({
      success: true,
      message: "Transmission Deleted Successfully",
      transmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Transmission",
      error: error.message,
    });
  }
};

// Add new method for reordering
exports.reorder = async (req, res) => {
  try {
    const { items } = req.body; // items = [{id: '...', order: 1}, ...]
    
    const updates = items.map(item => 
      Transmission.findByIdAndUpdate(
        item.id,
        { order: item.order },
        { new: true }
      )
    );

    await Promise.all(updates);

    const transmissions = await Transmission.find({})
      .sort({ order: 1 })
      .exec();

    res.status(200).json({
      success: true,
      message: "Transmissions Reordered Successfully",
      transmissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in reordering transmissions",
      error: error.message,
    });
  }
};
