const state = {
  currentDoc: 'Test',
  documentDir: 'documents'
}

const getters = {
  currentDoc: state => state.currentDoc,
  documentDir: state => state.documentDir
}

export default {
  state,
  getters
}
