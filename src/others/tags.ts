// ========== How to Add Tags ==========
// - Add in "Tags" enum
// - If in another category:
//      1. Add it below the last category
//      2. Set the first element in the new category to {First element in category before + 100}
//      3. Add the new value to GetTagTypeClass() 
//      4. CSS classes, at "Tag Colors"
export enum Tags {
    // Engine
    Tool = 0,
    Unity,
    // Unreal,
    Astro, 
    SvelteKit,
    
    // Project Type
    ProjectType = 100,
    School,
    GameJam,
    Personal,
    Client,
    
    // Platform
    Platform = 200,
    Windows,
    // WebGL,
    Website,

    // Status
    Status = 1000,
    Ongoing,
    Completed,
    OnHold, 
    Dropped,
}