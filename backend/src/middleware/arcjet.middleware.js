import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjectMiddleware = async (req, res, next) => {
    try {
       const decision = await aj.protect(req);
       if (decision.isDenied())
        {
          if (decision.reason.isRateLimit()){
                return res.status(429).json({message: "Too many requests, please try again later."});
          }
         else if (decision.reason.isBot()){
           return res.status(403).json({message: "Access denied, bot detected."});

         } else{
         return res.status(403).json({message: "Access denied."});
         }

        }

        // Additional spoofed bot check
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json(
           {
             error:"spoofed_bot_detected",
             message: "Access denied, spoofed bot detected."
            });
        }
        next();
        
    } catch (error)
    {
        console.error("Error in Arcjet middleware:", error);
        res.status(500).json({message: "Server error"});
        next();
    }
}