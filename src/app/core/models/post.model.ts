import {PostDto} from '../dto/post.dto';

export class PostModel {
  id: string;
  title: string;
  text: string;
  author: string;
  date: Date;

  constructor(dto: PostDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.text = dto.text;
    this.author = dto.author;
    this.date = new Date(dto.date);
  }
}
