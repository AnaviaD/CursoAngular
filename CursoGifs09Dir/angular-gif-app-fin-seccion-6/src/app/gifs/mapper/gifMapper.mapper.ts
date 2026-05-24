import { GiphyItem } from "../interfaces/giphy.interfaces";
import { Gif } from '../interfaces/myGif.interface';

export class GifMapper{

  static mapGiphyItemToGif(item: GiphyItem){
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyToGifArray(items: GiphyItem[]):Gif[]{
    return items.map(this.mapGiphyItemToGif);
  }

}
