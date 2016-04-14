$(document).ready( function(){
	
	checkDOMChange();

	function checkDOMChange(){
    	replaceLinks();
    	setTimeout( checkDOMChange, 100 );
    }


	function replaceLinks(){

		var generalLink = $("a[href]");

		$.each(generalLink, function(i, value){
			
			//this check is super naive.  
			//Should probably improve.
			// I expect I'll turn this into a function and most of the requests for updates will show up here.
			if( $(this).data('display') && $(this).data('replaced') != 1 ){
				console.log("data-display: ", $(this).data('display') )
				$(this).attr('data-replaced', 1)
				img_link = linkReplacementSelector($(this).data('display'))
				if( img_link ){
					$(this).html('<img width="200px" src="'+img_link+'"/><br/>'+$(this).data('display'))
				}
			}	
			
		})

}


	//is this an image?
	function linkReplacementSelector(link){
		var img_link_re = /(\.gif|\.jpg|\.png)/i; 
		var giphy_link_re = /(https?:\/\/giphy\.com\/gifs\/.*)/i;
		
		var match;

		var re = img_link_re;

		if ((match = re.exec(link)) !== null) {
    		if (match.index === re.lastIndex) {
        		re.lastIndex++;
    		}
    	// View your result using the m-variable.
    	// eg m[0] etc.
    		if (match){
    			console.log('image link', match)
    			return link
    		}
		}

		re = giphy_link_re;


		if ((match = re.exec(link)) !== null) {
    		if (match.index === re.lastIndex) {
        		re.lastIndex++;
    		}
    	// View your result using the m-variable.
    	// eg m[0] etc.
    		if (match){
				console.log('match[0]: ', match[0])
				var dirty_url = match[0]



				dirty_url = dirty_url.lastIndexOf('#') >= 0 ? dirty_url.substr(0, dirty_url.lastIndexOf('#') + 1) : dirty_url;
    			//console.log('dirty_url: ', dirty_url)

				dirty_url = dirty_url.lastIndexOf('?') >= 0 ? dirty_url.substr(0, dirty_url.lastIndexOf('?') + 1) : dirty_url;
    			//console.log('dirty_url: ', dirty_url)

    			if ( dirty_url.slice(-1) == '/' ){
    				dirty_url = dirty_url
    			}
    			console.log('dirty_url: ', dirty_url)

				dirty_token = dirty_url.lastIndexOf('/') >= 0 ? dirty_url.substr(dirty_url.lastIndexOf('/') + 1) : dirty_url;
    			console.log('dirty_token: ', dirty_token)
    			
    			var gify_token = dirty_token.substr(dirty_token.lastIndexOf('-') + 1 );
    			
    			console.log('gify_token: ', gify_token)

    			
    			
    			

    			var giphy_gif_link = 'http://media.giphy.com/media/'+gify_token+'/giphy.gif';
    			console.log('giphy link', giphy_gif_link)
    			return giphy_gif_link
    		}
		}

		return false;


		
	}


});