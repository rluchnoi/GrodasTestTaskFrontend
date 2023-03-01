function logTagsData () {
    const tags = Array.from(document.getElementsByTagName('*'));

    console.log(`Tags quantity: ${tags.length}`);

  	// count[tag.tagName] || 0 - if an element with such a key do not exist it defaults to 0
  	const tagsGrouped    = tags.reduce((count, tag) => {
    	count[tag.tagName] = (count[tag.tagName] || 0) + 1;
    	return count;
  	}, {});

  	console.log(`Tags grouped by their names: ${JSON.stringify(tagsGrouped)}`);

  	const tagNames   = tags.map(tag => tag.tagName);
  	const tagLengths = tagNames.map(name => name.length);

  	const tagLengthsGrouped = tagLengths.reduce((acc, length) => {
      	acc[length] = (acc[length] || 0) + 1;
      	return acc;
  	}, {});

  	console.log(`Tags grouped by their name's length: ${JSON.stringify(tagLengthsGrouped)}`);
}

export default logTagsData;
