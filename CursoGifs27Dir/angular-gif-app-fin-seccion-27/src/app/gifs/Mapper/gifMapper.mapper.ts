import { GifListComponent } from '../components/gif-list/gif-list.component';
import { ItemResponse } from '../interface/giphyResponse.interface';
import { myGifs } from '../interface/myGifs.interface';
export class gifMapper{
  static GiphyToGifItem(item: ItemResponse): myGifs{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static GiphytoGifArray(items: ItemResponse[]): myGifs[]{
    return items.map(this.GiphyToGifItem)
  }
}
