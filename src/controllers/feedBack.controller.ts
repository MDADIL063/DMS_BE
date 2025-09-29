import { Request, Response, Router } from "express";
import AsyncHandler from "express-async-handler";

import { Endpoints } from "../data/app.constants";
import { FeedbackService } from "../services/feedBack.service";

const feedbackController = Router();
const feedbackSvc = new FeedbackService();

// Create feedback
// feedbackController.post(
//   Endpoints.ROOT,
//   AsyncHandler(async (req: Request, res: Response) => {
//     console.log(req.body);
//     const feedback = await feedbackSvc.createFeedback(req.body);
//     res.status(201).json({
//       success: true,
//       message: "Feedback submitted successfully",
//       data: feedback,
//     });
//   })
// );

feedbackController.post(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    try {
      // Extract feedback data from request
      const { driver, rating, comment } = req.body;

      // Get logged-in user from token (auth middleware must set req.user)
      const createdBy = (req as any).user?._id;

      if (!driver || !rating || !createdBy) {
        res.status(400).json({
          success: false,
          message: "Driver, rating, and createdBy are required",
        });
        return;
      }

      // Merge into payload
      const feedbackData = {
        driver,
        rating,
        comment,
        createdBy,
      };

      const feedback = await feedbackSvc.createFeedback(feedbackData);

      res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
        data: feedback,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while submitting feedback",
        error,
      });
    }
  })
);

// Get feedback by driverId
feedbackController.get(
  "/driver/:driverId",
  AsyncHandler(async (req: Request, res: Response) => {
    const feedbacks = await feedbackSvc.getFeedbackByDriver(req.params.driverId);
    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  })
);

// Update feedback
feedbackController.put(
  "/:id",
  AsyncHandler(async (req: Request, res: Response) => {
    const feedbackId = req.params.id;
    const updatedBy = (req as any).user?._id; // taken from token

    const { rating, comment } = req.body;

    const feedback = await feedbackSvc.updateFeedback(feedbackId, { rating, comment }, updatedBy);

    if (!feedback) {
      res.status(404).json({ success: false, message: "Feedback not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedback,
    });
  })
);

export default feedbackController;
