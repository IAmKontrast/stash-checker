import {StashQuery} from "./tooltip/stashQuery";

/**
 * Represents a Stash GraphQL endpoint.
 */
export type StashEndpoint = {
    name: string,
    url: string,
    key: string,
}

/**
 * Return type of GraphQL queries representing an entry.
 */
export type StashEntry = {
    [key in DataField]: any;
} & {
    queries: StashQuery[];
    endpoint: string;
};

/**
 * A batch collector of requests.
 */
export interface BatchQuery {
    timerHandle: number,
    queries: GraphQlQuery[],
}

/**
 * A graphql query and result handlers.
 */
export interface GraphQlQuery {
    query: string,
    resolve?: (data: any) => void,
    reject?: (message?: string) => void
}

/**
 * Possible fields and subfields of the returned data
 */
export enum DataField {
    Id = "id",
    Code = "code",
    Name = "name",
    Disambiguation = "disambiguation",
    AliasList = "alias_list",
    Title = "title",
    Studio = "studio",
    Favorite = "favorite",
    Date = "date",
    Birthdate = "birthdate",
    HeightCm = "height_cm",
    Tags = "tags",
    Files = "files",
    Path = "path",
    Duration = "duration",
    VideoCodec = "video_codec",
    Width = "width",
    Height = "height",
    Size = "size",
    BitRate = "bit_rate",
}

/**
 * Entry types in Stash
 */
export enum Target {
    Scene = "scene",
    Performer = "performer",
    Gallery = "gallery",
    Movie = "movie",
    Studio = "studio",
    Tag = "tag",
}

/**
 * Ways to query for an entry
 */
export enum Type {
    Url = "url",
    Code = "code",
    StashId = "stash_id",
    Name = "name",
    Title = "title",
}

/**
 * A function to select a [Type] query parameter from a given element.
 */
export type Selector = (e: Element) => null | undefined | string;

/**
 * Configure queries for an entry.
 */
export interface CheckOptions {
    displaySelector?: (e: Element) => Element | null | undefined;
    urlSelector?: Selector | null;
    prepareUrl?: (url: string) => string | undefined;
    codeSelector?: Selector | null;
    stashIdSelector?: Selector | null;
    stashIdEndpoint?: string;
    nameSelector?: Selector | null;
    titleSelector?: Selector | null;
    color?: (data: any) => string;
    observe?: boolean;
}
