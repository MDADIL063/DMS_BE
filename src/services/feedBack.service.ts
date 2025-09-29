import { IFeedback } from "../interfaces/feedBack.interface";
import Feedback from "../models/feedBack.model";

export class FeedbackService {
  // ✅ Create feedback
  async createFeedback(data: Partial<IFeedback>): Promise<IFeedback> {
    const feedback = await Feedback.create(data);
    return feedback;
  }

  // ✅ Get feedbacks by driverId
  async getFeedbackByDriver(driverId: string): Promise<IFeedback[]> {
    return Feedback.find({ driver: driverId })
      .populate("createdBy", "name email") // optional: show creator details
      .populate("updatedBy", "name email")
      .exec();
  }

  // ✅ Update feedback by feedbackId
  async updateFeedback(feedbackId: string, data: Partial<IFeedback>, updatedBy: string): Promise<IFeedback | null> {
    return Feedback.findByIdAndUpdate(feedbackId, { ...data, updatedBy }, { new: true }).exec();
  }
}
