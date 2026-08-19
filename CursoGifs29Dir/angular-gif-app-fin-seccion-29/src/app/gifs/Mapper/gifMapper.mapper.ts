import { ItemResponse } from "../interface/giphyResponse.interface"
import { myGif } from "../interface/myGif.interface"


export class giphyMapper{
  static giphyItemToGif(item: ItemResponse): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGif(items: ItemResponse[]): myGif[]{
    return items.map(this.giphyItemToGif)
  }
}
