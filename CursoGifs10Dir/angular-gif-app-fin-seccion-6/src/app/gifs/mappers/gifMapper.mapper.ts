import { GiphyItem } from "../interfaces/giphy.interfaces";
import { myGif } from "../interfaces/myGif.interface";

export class gifMapper{
  static mapGiphyItemToGif(item: GiphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]):myGif[]
  {
    return items.map(this.mapGiphyItemToGif);
  }
}
