import { IgApiClient } from "instagram-private-api";

export class InstagramService {

    // Global Constants
    private static FEED_LIMIT: number = 5

    static async getUserTimeline() {
        const ig = new IgApiClient();

        const username = process.env.IG_USERNAME || ''
        const pwd = process.env.IG_PASSWORD || ''

        ig.state.generateDevice(username);
        const auth = await ig.account.login(username, pwd);
        const timeline = await ig.feed.timeline().request();


        const feedItems = timeline.feed_items
        let userFeed = []

        for(let i = 0 ; i < this.FEED_LIMIT ; i++) {
            userFeed[i] = {
                username: feedItems[i].media_or_ad.user.username,
                caption: feedItems[i].media_or_ad.caption.text,
                image: feedItems[i].media_or_ad.image_versions2?.candidates[0].url || ''

            }
        }

        return userFeed
    }


}