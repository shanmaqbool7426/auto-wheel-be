import Report from './model.js';

export const createReport = async (req, res) => {
    try {
        const report = new Report({
            vehicleId: req.body.vehicleId,
            vehicleOwnerId: req.body.vehicleOwnerId,
            reportType: req.body.reportType,
            description: req.body.description,
            reportedBy: req.user._id  // Assuming user is authenticated
        });
        
        const savedReport = await report.save();
        
        // Populate references for response
        await savedReport.populate([
            { path: 'vehicleId' },
            { path: 'vehicleOwnerId', select: 'name email' },
            { path: 'reportedBy', select: 'name email' }
        ]);
        
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const { status, page = 1, limit = 10, reportType } = req.query;
        
        // Build query based on filters
        const query = {};
        if (status) query.status = status;
        if (reportType) query.reportType = reportType;
        
        const reports = await Report.find(query)
            .populate('vehicleId')
            .populate('vehicleOwnerId', 'name email')
            .populate('reportedBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const totalReports = await Report.countDocuments(query);
        
        res.json({
            reports,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalReports / limit),
            totalReports
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReportsByVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const reports = await Report.find({ vehicleId })
            .populate('reportedBy', 'name email')
            .populate('vehicleOwnerId', 'name email')
            .sort({ createdAt: -1 });
            
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate([
            'vehicleId',
            { path: 'vehicleOwnerId', select: 'name email' },
            { path: 'reportedBy', select: 'name email' }
        ]);
        
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        res.json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        res.json({ message: 'Report deleted successfully', reportId: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reports statistics
export const getReportsStats = async (req, res) => {
    try {
        const stats = await Report.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    byType: {
                        $push: {
                            type: '$reportType',
                            vehicleId: '$vehicleId'
                        }
                    }
                }
            }
        ]);
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
