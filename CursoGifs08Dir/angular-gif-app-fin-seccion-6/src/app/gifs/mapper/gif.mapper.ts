import { GiphyItem } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/myGif.interface";

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem):Gif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    };
  }

  static mapGiphyItemToGifArray(items: GiphyItem[]):Gif[]{
    return items.map(this.mapGiphyItemToGif);
  }
}
