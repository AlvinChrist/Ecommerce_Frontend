export class Image {
  imageType: string;
  imageName: string;
  imagePath: string;
  used: boolean;
  productId: number;

  constructor(Image?: Image){
    this.imageType = Image.imageType || '';
    this.imageName = Image.imageName || '';
    this.imagePath = Image.imagePath || '';
    this.used = Image.used || false;
    this.productId = Image.productId || 0;
  }
}