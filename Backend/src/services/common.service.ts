import { text } from 'body-parser';
import { Project } from '../models/project';
import { ProjectSearchSchema } from '../validation/common.validation';
import { HttpException } from '../exceptions/HttpException';

const searchProjectService = async (
  q: ProjectSearchSchema,
  { page = 1, perPage = 1 }: { page: any; perPage: any }
) => {
  let results;
  let count;
  let isNextable;

  if (Object.keys(q).length === 0) {
    results = await Project.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    count = await Project.find().count();
    isNextable = (page - 1) * perPage + results.length < count;
  } else {
    const { search, location, bedrooms, bathrooms, size, price } = q;
    const [minSize, maxSize] = size;
    const [minPrice, maxPrice] = price;
    const query = {
      // $text: { $search: search },
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
      bedrooms: { $lte: bedrooms },
      bathrooms: { $lte: bathrooms },
      size: { $gte: minSize, $lte: maxSize },
      price: { $gte: minPrice, $lte: maxPrice },
    };
    results = await Project.find(
      query

      // { score: { $meta: 'textScore' } }
    )
      .skip((page - 1) * perPage)
      .limit(perPage);
    // .sort({ score: { $meta: 'textScore' } })

    count = await Project.find(query).count();
    isNextable = (page - 1) * perPage + results.length < count;
  }

  return { message: 'Success', data: { results, isNextable } };
};

const getAllProjectsService = async (page?: any, perPage?: any) => {
  const p = page || 1;
  const perP = perPage || 10;

  const products = await Project.find()
    .skip((p - 1) * perP)
    .limit(perP);

  return products;
};

const getProjectByIdService = async (projectId: string) => {
  const project = await Project.findById(projectId)
    .populate('owner')
    .select('-password');
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }
  return project;
};

export { searchProjectService, getAllProjectsService, getProjectByIdService };
