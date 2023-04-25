import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// localStorage.setItem('tweetsxData', JSON.stringify(tweetsData));


const tweetssData = JSON.parse(localStorage.getItem('tweetsxData'));
localStorage.setItem('tweetsxData', JSON.stringify(tweetsData));

console.log("My Data  >> "+tweetssData[0].likes)
console.log(tweetssData)
/*
Challenge:
3. We could improve index.js by moving one line
   of code to a better position. Find it and move it!
*/
// console.log(tweetsData);
document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === "tweet-btn") {
        handleTweetBtnClick();
    }
    else if (e.target.dataset.delete){
        // console.log(e.target.dataset.delete)
        handleDeleteClick(e.target.dataset.delete);
    }
    else if (e.target.dataset.ownreply){
        // console.log(e.target.dataset.ownreply)
        handleOwnReplyClick(e.target.dataset.ownreply);
    }
});

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetssData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
        localStorage.setItem('tweetssData', JSON.stringify(tweetssData));
    } else {
        targetTweetObj.likes++;
        localStorage.setItem('tweetssData', JSON.stringify(tweetssData));
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    localStorage.setItem('tweetssData', JSON.stringify(tweetssData));
    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetssData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render();
}

function  handleDeleteClick(deleteID){
    // document.getElementById(`delete-${deleteID}`).classList.toggle("hidden"); 
    const targetDeleteObj = tweetssData.filter(function(tweet){
        return tweet.uuid === deleteID;
    })[0];
    // console.log(targetDeleteObj)
      const indexx = tweetssData.indexOf(targetDeleteObj);
     
      tweetssData.splice(indexx, 1);
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
            
                const input = document.querySelector(`input[name="${replyId}"]`);
                
             
             console.log(input.value)

             
   


}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input");

    /*
  Challenge:
  1. No empty tweets!
  2. Clear the textarea after tweeting!
  */
    if (tweetInput.value) {
        tweetssData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        });
        render();
        tweetInput.value = "";
    }
}
function handleOwnReplyClick(tweetInput){
    console.log("touched the reply icon")
    
    const input = document.querySelector(`input[name="${tweetInput}"]`);
    const twitData =  {
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: input.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }
           tweetssData.forEach(function(tweet){
         
            if(tweet.replies.length >= 0)
           
            {
                if(input.value){
                if(tweet.uuid===tweetInput){
                    tweet.replies.unshift(twitData)
                    render()
                    document.getElementById(`replies-${tweetInput}`).classList.remove("hidden");
                }

                    
                }
            }
           })
   

    
    
    
}
 

function getFeedHtml() {
    let feedHtml = ``;

    tweetssData.forEach(function (tweet) {
        let likeIconClass = "";

        if (tweet.isLiked) {
            likeIconClass = "liked";
        }

        let retweetIconClass = "";

        if (tweet.isRetweeted) {
            retweetIconClass = "retweeted";
        }
       

        let repliesHtml = "";
        let ownRepliesHtml = "";

        if (tweet.replies.length > 0) {
            ownRepliesHtml =`  
            <div class="tweet-reply">
            
            <input type="text" name="${tweet.uuid}" id="inputIdss">
            <i class="fa-solid fa-reply" data-ownreply="${tweet.uuid}" id="replie-${tweet.uuid}"></i>
            </div>
             `
            
            
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                        <div class="tweet-reply">
                            <div class="tweet-inner">
                          
                                <img src="${reply.profilePic}" class="profile-pic">
                                    <div>
                                        <p class="handle">${reply.handle}</p>
                                        <p class="tweet-text">${reply.tweetText}</p>
                                    </div>
                                </div>
                        </div>
                        `;
            });
        }
        else{
            ownRepliesHtml =`  
            <div class="tweet-reply">
            
            <input type="text" name="${tweet.uuid}" id="inputIdss">
            <i class="fa-solid fa-reply" data-ownreply="${tweet.uuid}" id="replie-${tweet.uuid}"></i>
            </div>
             `
        }

        feedHtml += `
                        <div class="tweet">
                            <div class="tweet-inner ">
                                <img src="${tweet.profilePic}" class="profile-pic">
                                <div >
                                    <p class="handle">${tweet.handle}</p>
                                    <p class="tweet-text">${tweet.tweetText}</p>
                                    <div class="tweet-details">
                                        <span class="tweet-detail">
                                            <i class="fa-regular fa-comment-dots"
                                            data-reply="${tweet.uuid}"
                                            ></i>
                                            ${tweet.replies.length}
                                        </span>
                                        <span class="tweet-detail">
                                            <i class="fa-solid fa-heart ${likeIconClass}"
                                            data-like="${tweet.uuid}"
                                            ></i>
                                            ${tweet.likes}
                                        </span>
                                        <span class="tweet-detail">
                                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                                            data-retweet="${tweet.uuid}"
                                            ></i>
                                            ${tweet.retweets}
                                        </span>
                                        <span class="tweet-detail">
                                            <i class="fa-solid fa-trash hidden" id="delete-${tweet.uuid}"
                                            data-delete="${tweet.uuid}"
                                            ></i>
                                            
                                            
                                        </span>
                                    </div>   
                                </div>            
                            </div>
                            <div class="hidden" id="replies-${tweet.uuid}">
                                ${ownRepliesHtml}
                                ${repliesHtml}
                               
                            </div>   
                        </div>
                        `;
                        localStorage.setItem('tweetsxData', JSON.stringify(tweetssData));
    });
    return feedHtml;
  

}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml();
    localStorage.setItem('tweetsxData', JSON.stringify(tweetssData));
    console.log(tweetsData)
}
setTimeout(function(){
    location.reload();
  }, 1000); // Reload page after 1 second
  
  setTimeout(function(){
    location.reload();
  }, 2000); // Reload page after 2 seconds this

render();

