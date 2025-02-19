import ReportType from './model.js';

export const createReportType = async (req, res) => {
    try {
        const reportType = new ReportType({
            title: req.body.title,
            description: req.body.description
        });
        const saved = await reportType.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllReportTypes = async (req, res) => {
    try {
        const reportTypes = await ReportType.find({ isActive: true });
        res.json(reportTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReportType = async (req, res) => {
    try {
        const updated = await ReportType.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                isActive: req.body.isActive
            },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReportType = async (req, res) => {
    try {
        await ReportType.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: 'Report type deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
