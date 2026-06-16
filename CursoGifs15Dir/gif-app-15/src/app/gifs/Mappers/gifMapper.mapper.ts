import { giphyItem } from "../interfaces/giphyResponse.interface";
import { myGif } from "../interfaces/myGif.interface";

export class GiphyToGif{
  static giphytoGifMapper(item: giphyItem): myGif{
    return{
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGifArray(items: giphyItem[]): myGif[]
  {
    return items.map(this.giphytoGifMapper)
  }
}
