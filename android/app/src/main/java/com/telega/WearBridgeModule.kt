package com.telega  // проверь, что совпадает с packageName из AndroidManifest.xml

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.wearable.*

class WearBridgeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext),
    MessageClient.OnMessageReceivedListener {

    private val messageClient = Wearable.getMessageClient(reactContext)

    override fun getName(): String = "WearBridge"

    // Отправка данных на часы
    @ReactMethod
    fun sendToWatch(payload: String, promise: Promise) {
        Wearable.getNodeClient(reactContext).connectedNodes
            .addOnSuccessListener { nodes ->
                if (nodes.isEmpty()) {
                    promise.reject("NO_NODES", "Нет подключённых Wear устройств")
                    return@addOnSuccessListener
                }

                for (node in nodes) {
                    val data = payload.toByteArray()
                    messageClient.sendMessage(node.id, "/message", data)
                        .addOnSuccessListener { promise.resolve(true) }
                        .addOnFailureListener { e -> promise.reject("SEND_ERROR", e) }
                }
            }
            .addOnFailureListener { e ->
                promise.reject("NODE_ERROR", e)
            }
    }

    // Подключение слушателя
    override fun initialize() {
        super.initialize()
        messageClient.addListener(this)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        messageClient.removeListener(this)
    }

    // Приём сообщений от часов
    override fun onMessageReceived(event: MessageEvent) {
        val params: WritableMap = Arguments.createMap().apply {
            putString("path", event.path)
            putString("message", String(event.data))
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("WearMessage", params)
    }
}