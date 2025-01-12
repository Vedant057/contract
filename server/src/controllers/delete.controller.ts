import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import ContractAnalysisSchema, {
} from "../models/contract.model";


export const deleteContractByID = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
        const result = await ContractAnalysisSchema.deleteOne({
            _id: id,
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Contract not found or not authorized" });
    }

      res.json({ message: "Contract deleted" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete contract" });
    }
  };