import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Modal,                        // ← add
    TouchableWithoutFeedback,     // ← add
} from 'react-native';

const masterItems = [
    'Venues', 'Locations', 'Pools', 'Enclosures',
    'Distributions', 'Terminals', 'Users', 'Users KYC',
];

const MasterDataModal = ({
    visible,
    onClose,
    onGoToMasters,
}: {
    visible: boolean;
    onClose: () => void;
    onGoToMasters: () => void;
}) => (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={modal.overlay}>
                <TouchableWithoutFeedback>
                    <View style={modal.sheet}>

                        {/* X close */}
                        <TouchableOpacity style={modal.closeBtn} onPress={onClose}>
                            <Text style={modal.closeX}>✕</Text>
                        </TouchableOpacity>

                        {/* Orange warning icon */}
                        <View style={modal.iconWrap}>
                            <View style={modal.iconCircle}>
                                <Text style={modal.iconText}>!</Text>
                            </View>
                        </View>

                        <Text style={modal.title}>Master Data Required</Text>
                        <Text style={modal.subtitle}>
                            You need to create and configure the required master data before
                            you can create race cards or meetings.
                        </Text>

                        {/* Masters list */}
                        <View style={modal.listBox}>
                            <Text style={modal.listTitle}>Please set up the following masters</Text>
                            <View style={modal.listGrid}>
                                {masterItems.map((item, i) => (
                                    <View key={i} style={modal.listItem}>
                                        <Text style={modal.listIcon}>📄</Text>
                                        <Text style={modal.listLabel}>{item}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Info box */}
                        <View style={modal.infoBox}>
                            <Text style={modal.infoIcon}>ℹ️</Text>
                            <Text style={modal.infoText}>
                                Once master data created, you will be able to create race
                                cards, meetings and scheduled events.
                            </Text>
                        </View>

                        {/* Buttons */}
                        <View style={modal.btnRow}>
                            <TouchableOpacity style={modal.cancelBtn} onPress={onClose} activeOpacity={0.8}>
                                <Text style={modal.cancelText}>✕  Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={modal.goBtn} onPress={onGoToMasters} activeOpacity={0.8}>
                                <Text style={modal.goText}>→  Go to Masters</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

const modal = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    sheet: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    closeBtn: { position: 'absolute', top: 16, right: 18, zIndex: 10, padding: 4 },
    closeX: { fontSize: 18, color: '#333', fontWeight: '600' },
    iconWrap: { alignItems: 'center', marginBottom: 16, marginTop: 8 },
    iconCircle: {
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: '#FFF3E0',
        borderWidth: 2, borderColor: '#FF9800',
        justifyContent: 'center', alignItems: 'center',
    },
    iconText: { fontSize: 32, color: '#FF9800', fontWeight: '700' },
    title: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 18 },
    listBox: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 14, marginBottom: 14 },
    listTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
    listGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    listItem: { width: '50%', flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
    listIcon: { fontSize: 14 },
    listLabel: { fontSize: 13, color: '#333' },
    infoBox: {
        flexDirection: 'row', alignItems: 'flex-start',
        backgroundColor: '#EEF4FF', borderRadius: 12,
        padding: 14, gap: 10, marginBottom: 22,
    },
    infoIcon: { fontSize: 18, marginTop: 1 },
    infoText: { flex: 1, fontSize: 13, color: '#333', lineHeight: 20 },
    btnRow: { flexDirection: 'row', gap: 12 },
    cancelBtn: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: '#2979FF',
        borderRadius: 10, paddingVertical: 13,
    },
    cancelText: { fontSize: 15, fontWeight: '600', color: '#2979FF' },
    goBtn: {
        flex: 2, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#2979FF', borderRadius: 10, paddingVertical: 13,
    },
    goText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});

export default MasterDataModal