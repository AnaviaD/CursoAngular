import { GiphyItem } from "../interface/giphyResponse.interface";
import { myGif } from "../interface/myGif.interface";

export class giphyToGif{
  static giphyToGifItem(item: GiphyItem):myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyToGifArray(items: GiphyItem[]): myGif[]{
    return items.map(this.giphyToGifItem)
  }
}
