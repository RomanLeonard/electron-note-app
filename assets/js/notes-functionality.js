$(function(){
    refreshSidebar()
    setDefaultFontSize()
})

// on new note
$(document).on('click', '#sidebar-new-note-btn', function(){
    // change title
    setTitle(new_note_text);
    // change notes input content
    $(note_input).val(new_note_text);
    $(note_input).attr('data-note_index', '');
});

// after note was saved, reset title


// select sidebar note
$(document).on('click', '#sidebar .list-group-item', function(){
    // get note_index
    const note_index = $(this).attr('id');
    // set note_index to note input
    setNoteIndex(note_index)
    // get selected note
    const selected_note = getMemoryNote(note_index);
    // load note in input area
    $(note_input).val(selected_note.content);
    // set tite for new note
    setTitle(selected_note.title);
    // set active note
    setActiveNote();
})

// save note
$(document).on('click', '#save-note-btn', function(){
    saveNote();
})
$(document).on('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveNote();
    }
});

// delete note
$(document).on('click', '#sidebar .list-group-item .sidebar-note-delete-btn', function(e){
    e.preventDefault();
    var note_index = parseInt($(this).parent('.list-group-item').attr('id'));
    deleteMemoryNote(note_index);
})


// save note
function saveNote() {
    
    // get note
    const note = $(note_input).val();
    
    if (note.trim() === '') {
        return;
    }
    
    // get title
    var index = note.indexOf('\n');
    var title = index !== -1 ? note.substring(0, index) : note;
    var title = title.trim();

    const note_to_save = {
        title: title,
        content: note
    }

    // check if new note or existing
    if (getNoteIndex()) {
        updateMemoryNote(note_to_save)
    } else {
        saveMemoryNote(note_to_save);
    }

    refreshSidebar();
}

function saveMemoryNote(note) {
    let savedNotes = getMemoryNotes();
    savedNotes.push(note);
    memorySaveNotes(savedNotes);
    setTitle(note.title);
    setNoteIndex(savedNotes.length - 1)
}

function updateMemoryNote(note) {
    let savedNotes = getMemoryNotes();
    const note_index = $(note_input).attr('data-note_index');
    console.log(note_index);
    savedNotes[note_index] = note;
    memorySaveNotes(savedNotes)
}

function deleteMemoryNote(note_index) {
    let savedNotes = getMemoryNotes();
    savedNotes.splice(note_index, 1);
    memorySaveNotes(savedNotes);
    resetWindow();
}

function refreshSidebar() {

    const sidebarNotesList = $('#sidebar-notes-list .list-group');

    // delete sidebar note content
    $(sidebarNotesList).html('');
    // get all saved notes
    const savedNotes = getMemoryNotes();
    
    // add notes to sidebar
    $(savedNotes).each(function(index, noteContent){
        var note = create_note_item({id: index, title: noteContent.title});
        $(sidebarNotesList).append(note);
    });

    // get selected note
    setActiveNote()

}
