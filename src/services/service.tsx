export type FetchedPost = {
    body: string,
    id: number,
    title: string,
    userId: number
}

export type FetchedAlbums = {
    userId: number,
    id: number,
    title: string,
}

export type Album = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export type AlbumData = {
    userId: number,
    id: number,
    title: string,
    photos: Array<Album>
}

type NewPost = {
    userId: number,
    title: string,
    body: string
}

export default class Service {
    getResource = async (url: string, options: object) => {
      const response = await fetch(` https://jsonplaceholder.typicode.com/${url}`, options);
      if (!response.ok) {
        throw new Error(`Could not fetch${url}, received ${response.status}`);
      } else {
        return response.json();
      }
    }

    getUsers = async () => {
      const options = {
        method: 'GET',
      };
      return this.getResource('users', options);
    }

    getPosts = async (): Promise<Array<FetchedPost>> => {
      const options = {
        method: 'GET',
      };
      return this.getResource('posts', options);
    }

    getAlbums = async (): Promise<Array<FetchedAlbums>> => {
      const options = {
        method: 'GET',
      };
      return this.getResource('albums', options);
    }

    getAlbum = async (id: number | string): Promise<AlbumData> => {
      const options = {
        method: 'GET',
      };

      return this.getResource(`albums/${id}?_embed=photos`, options);
    }

    createPost = async (body: NewPost) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      return this.getResource('posts', options);
    }
}
