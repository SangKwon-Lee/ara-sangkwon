export interface MemoryType {
  attributes: {
    createdAt: string;
    date: string;
    desc: string;
    lat: number;
    lng: number;
    place: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    slide: {
      data: {
        attributes: {
          alternativeText: null;
          caption: null;
          createdAt: string;
          ext: string;
          formats: null;
          hash: string;
          height: number;
          mime: string;
          name: string;
          previewUrl: null;
          provider: string;
          provider_metadata: null;
          size: number;
          updatedAt: string;
          url: string;
          width: number;
        };
      }[];
    };
    thumbnail: {
      data: {
        attributes: {
          alternativeText: null;
          caption: null;
          createdAt: string;
          ext: string;
          formats: null;
          hash: string;
          height: number;
          mime: string;
          name: string;
          previewUrl: null;
          provider: string;
          provider_metadata: null;
          size: number;
          updatedAt: string;
          url: string;
          width: number;
        };
      };
    };
  };
}
