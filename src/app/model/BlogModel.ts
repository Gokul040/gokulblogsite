import { CategoryModel } from "./CategoryModel";

export class BlogModel {
    id?: number;
    blogTitle?: string;
    author?: string;
    authorEmail?: string;
    category?: CategoryModel;
    createdDate?: Date;
    updatedDate?: Date;
    likeCount?: number;
    totalView?: number;
    blogImage1?: string;
    blogImage2?: string;
    blogImage3?: string;
    subTopic1?: string;
    subTopic2?: string;
    st1Paragraph1?: string;
    st1Paragraph2?: string;
    st1Paragraph3?: string;
    st2Paragraph4?: string;
    st2Paragraph5?: string;
    st2Paragraph6?: string;
    imageData?: string;
}