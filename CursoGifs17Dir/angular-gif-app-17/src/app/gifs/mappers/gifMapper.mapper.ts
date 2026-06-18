import { GiphyItem } from '../interfaces/giphyResponse.interface';
import { myGif } from '../interfaces/myGif.interface';

export class gifMapper{

  static giphyItemToGif(item: GiphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGifArray(items: GiphyItem[]): myGif[]{
    return items.map(this.giphyItemToGif)
  }
}
