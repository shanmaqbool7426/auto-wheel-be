import cron from 'node-cron';
import Blog from '../Blog/model.js';

// Run every minute to check for scheduled posts
export const initScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      // Find all scheduled posts that should be published
      const scheduledPosts = await Blog.find({
        visibility: 'Scheduled',
        scheduledAt: { $lte: now },
        publishDate: null // Not yet published
      });

      // Update each post to be public
      for (const post of scheduledPosts) {
        await Blog.findByIdAndUpdate(post._id, {
          visibility: 'Public',
          publishDate: now,
          scheduledAt: null
        });
        
        console.log(`Post "${post.title}" has been automatically published at ${now}`);
      }
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });
};