import { giphyItem } from "../interfaces/giphyGif.interface";
import { myGif } from "../interfaces/myGif.interface";

export class giphyMapper {
  static giphyToGifItem(item: giphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToFigArray(items: giphyItem[]): myGif[]{
    return items.map(this.giphyToGifItem)
  }
}
