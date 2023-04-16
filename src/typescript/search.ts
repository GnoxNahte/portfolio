import FlexSearch, { CreateOptions } from "flexsearch";

export interface Project {
    title: string;
    shortDescription: string;
    releaseDate: Date;
    projectLink?: string;
    githubLink?: string;
    thumbnailPath: string;
    tags: string[];
    ifShow: boolean;
}

const options: CreateOptions = {
    tokenize: "forward",
    encode: "advanced",
    async: true,
    //worker: 4,
    // depth: 3,
    doc: {
        id: "title",
        field: ["title","shortDescription", "tags"],
    }
}

console.log("Creating flex search")
const index = FlexSearch.create<Project>(options);

export function addToIndex(project: Project) {
    console.log("Adding proj")
    index.add(project);
}

export function searchProjects(query: string) {
    return index.search(query);
}