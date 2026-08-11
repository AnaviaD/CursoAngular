import { ItemResponse } from "../interface/GiphyResponse.interface";
import { myGif } from "../interface/myGif.interface";

export class GifMapper{
  static itemGiphyToGif(item: ItemResponse): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static arrayGiphyToGif(items: ItemResponse[]): myGif[]{
    return items.map(this.itemGiphyToGif)
  }
}
