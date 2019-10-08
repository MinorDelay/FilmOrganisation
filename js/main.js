
function setValue(selection, selectedProperty) {
    let tagValue = document.tagSelection.tag.value; // Get selected tag to change
    let listValue = selection.value;
    let tagList = document.getElementsByTagName(tagValue); // Get list of selected tag
    for (let i = 0; i < tagList.length; i++) {
        tagList[i].style[selectedProperty] = listValue; // Change input property
    }

    // Save presets in sessionStorage
    sessionStorage.setItem(tagValue + "_" + selectedProperty, listValue);
}