import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class HousesService {
    async getAll() {
        const res = await api.get('api/houses')
        logger.log(res.data)
        AppState.houses = res.data
    }

    async getById(id) {
        const res = await api.get('api/houses/' + id)
        logger.log(res.data)
        AppState.activeHouse = res.data
    }

    async create(houseData) {
        const res = await api.post('api/houses/', houseData)
        logger.log(res.data)
        AppState.cars.push(res.data)
        return res.data
    }

    async update(houseData) {
        const res = await api.put('api/houses/' + houseData.id, houseData)
        logger.log(res.data)
        AppState.activeHouse = res.data
    }
}

export const housesService = new HousesService()