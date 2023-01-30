export enum Tags {
    // Engine
    Unity = 0,
    Unreal,
    Astro, 
    
    // Project Type
    School = 100,
    GameJam,
    Personal,
    Client,

    // Platform
    Windows = 200,
    WebGL,
    Website,
}

// To add a new tag, add it above in enum Tags.
// If its in another catergory, add the tag and set it to last value + 100
// Go to TagDisplay.astro and add it to 
// - GetTagTypeClass() 
// - CSS class