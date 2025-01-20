import Category from "../models/category";
import type { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;

    const category = new Category({
      name,
      parentId: parentId || null,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "categories retrived succesfully", categories });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, parentId } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    category.name = name ?? category.name;
    category.parentId = parentId ?? category.parentId;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    await Category.updateMany({ parentId: id }, { $set: { parentId: null } });

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};
