/*
public class BloggerMonthlyRequiredPostsDto
{
    public Guid BloggerId { get; set; }
    public BloggerStoreDto Store { get; set; }
    public int Interval { get; set; }
    public int RequiredPostsCount { get; set; }
    public int PostsSubmitted { get; set; }
}
 */
import {Store} from "./Store";

export default interface BloggerMonthlyRequiredPostsDto {
    bloggerId: string;
    store: Store;
    interval: number;
    requiredPostsCount: number;
    postsSubmitted: number;
}
