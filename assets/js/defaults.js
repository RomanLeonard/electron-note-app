
const title_default = 'lNotes';
const title_separator = ' - ';

const new_note_text = 'New note...';

const note_input = $('textarea[name="notes-input"]');

const font_default_size = 14;
const font_limit_min = 8;
const font_limit_max = 30;

function create_note_item(note) {
    return `<li class="list-group-item" id="`+ note.id +`">
        <span clas="sidebar-note-title">`+ note.title +`</span>
        <span class="sidebar-note-delete-btn">
            <span class="icon-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </span>
            <span class="icon-active">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
            </span>
        </span>
    </li>`;
}

function setTitle(text) {
    $('title').text(title_default + title_separator + text);
}

function setNoteIndex(index) {
    $(note_input).attr('data-note_index', index);
}

function getNoteIndex() {
    return $(note_input).attr('data-note_index');
}

function setActiveNote() {
    var note_index = getNoteIndex();
    $('#sidebar .list-group-item').removeClass('active');
    $('#sidebar .list-group-item[id="'+ note_index +'"').addClass('active');

}

function getMemoryNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function getMemoryNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes[index];
}

function memorySaveNotes(savedNotes) {
    localStorage.setItem('notes', JSON.stringify(savedNotes));
}

function resetWindow() {
    refreshSidebar();
    $(note_input).val('');
    setNoteIndex(false)
    setTitle('');
}

function setDefaultFontSize() {
    var saved_font_size = JSON.parse(localStorage.getItem('font_size')) || font_default_size;
    $(note_input).css('font-size', saved_font_size + 'px');
}

function getFontSize() {
    return parseInt($(note_input).css('font-size'));
}

function setFontSize(value) {
    console.log('font: ' + value);
    var size = getFontSize() + value;

    if (value == 'default') {
        size = font_default_size;
    }

    console.log({size});

    if ((size <= font_limit_min) || (size >= font_limit_max)) {
        return;
    }

    $(note_input).css('font-size', size + 'px');

    localStorage.setItem('font_size', JSON.stringify(size));
}
