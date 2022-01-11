export class Product {
  beforeDiscount?: number;
  productId: number;
  productName: string;
  productSummary: string;
  productCategory: string;
  productDesc: string;
  productBrand: string;
  productPrice: number;
  productStock: number;
  discountId?: number;
  product_galleries?: FormData;

  constructor(Product: any = {}) {
    this.productId = Product.productId || 0;
    this.productName = Product.productName || '';
    this.productCategory = Product.productCategory || '';
    this.productSummary = Product.productSummary || '';
    this.productDesc = Product.productDesc || '';
    this.productBrand = Product.productBrand || '';
    this.productPrice = Product.productPrice || 0;
    this.productStock = Product.productStock || 0;
    this.discountId = Product.discountId || 0 ;
  }
}

export class ProductImage {
  imageType: string;
  imageName: string;
  imagePath: string;
  used: boolean;
  productId: number;

  constructor(ProductImage: any = {}){
    this.imageType = ProductImage.imageType || "";
    this.imageName = ProductImage.imageName || "";
    this.imagePath = ProductImage.imagePath || "";
    this.used = ProductImage.used || true;
    this.productId = ProductImage.productId || 0;
  }
}

export class ProductRating {
  product_rating_id: number;
  user_id: number;
  productId: number;
  product_rating: number;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductRating: any = {}) {
    this.product_rating_id = ProductRating.product_rating_id || 0;
    this.user_id = ProductRating.user_id || 0;
    this.productId = ProductRating.productId || 0;
    this.product_rating = ProductRating.product_rating || 0;
    this.created_at = ProductRating.created_at || null;
    this.updated_at = ProductRating.updated_at || null;
  }
}

export class ProductDiscount {
  discount_id: number;
  discount_name: string;
  discount_percent: number;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductDiscount: any = {}){
    this.discount_id = ProductDiscount.discount_id || 0;
    this.discount_name = ProductDiscount.discount_name || '';
    this.discount_percent = ProductDiscount.discount_percent || 0;
    this.created_at = ProductDiscount.created_at || null;
    this.updated_at = ProductDiscount.updated_at || null;
  }
}

export class ProductComment {
  user_id: number;
  productId: number;
  comment_text: string;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductComment: any = {}) {
    this.user_id = ProductComment.user_id || 0;
    this.productId = ProductComment.productId || 0;
    this.comment_text = ProductComment.comment_text || '';
    this.created_at = ProductComment.created_at || null;
    this.updated_at = ProductComment.updated_at || null;
  }
}

export class ProductGallery {
  image_id: number;
  productId: number;
  image_path: string;
  created_at: string | null;

  constructor(ProductGallery: any = {}) {
    this.image_id = ProductGallery.image_id || 0;
    this.productId = ProductGallery.productId || 0;
    this.image_path = ProductGallery.image_path || '';
    this.created_at = ProductGallery.created_at || null;
  }
}

export class ProductSearch{
  page: number;
  size: number;
  filterType: string;
  filterValue: string;
  searchedProduct: string;

  constructor(ProductSearch: any = {}) {
    this.page = ProductSearch.page || 0;
    this.size = ProductSearch.size || 10;
    this.filterType = ProductSearch.filterType || "";
    this.filterValue = ProductSearch.filterValue || "";
    this.searchedProduct = ProductSearch.searchedProduct || "";
  }
}