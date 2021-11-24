import qs from "qs";

export default {
    name: (qs.parse(location.search.replace('?', '')) as any).name,
    roomId: ""
}