import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static mapGiphyItemToGif(gifItem: GiphyItem): Gif
  {
    return {
      id: gifItem.id,
      title: gifItem.title,
      url: gifItem.images.original.url,
    }
  }

  static mapGiphyItemToGifArray(items: GiphyItem[]): Gif[]
  {
    return items.map(this.mapGiphyItemToGif);
  }
}
