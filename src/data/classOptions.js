import API from '../api'

async function classOptions() {
  let classes = await API.get('classes')
}
