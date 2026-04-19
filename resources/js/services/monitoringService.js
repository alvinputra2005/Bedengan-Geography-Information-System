import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';

const latestSensorRef = ref(realtimeDb, 'sensor/latest');
const sensorHistoryRef = ref(realtimeDb, 'sensor/history');

export function subscribeToLatestSensor(onData, onError) {
    return onValue(latestSensorRef, (snapshot) => onData(snapshot.val()), onError);
}

export function subscribeToSensorHistory(onData, onError) {
    return onValue(sensorHistoryRef, (snapshot) => onData(snapshot.val()), onError);
}
