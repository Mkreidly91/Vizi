import { Schema, model, Document } from 'mongoose';
import { IUser } from './customer';
import { IProjectDocument } from './project';
interface ICompany extends IUser {
  logo: string;
  projects?: IProjectDocument[];
}

interface ICompanyDocument extends ICompany, Document {}

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
  password: { type: String, required: true, minlength: 6 },
  logo: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

const Company = model<ICompanyDocument>('Company', CompanySchema);

export { Company };