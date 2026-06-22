// Full corrected DashboardTable.tsx
import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const CHIP_W = 68;
const VENUE_W = 122;   // 12px padding each side + label space
const MEETING_W = 142;
const ROW_H = 44;
const HEADER_H = 36;

type ChipStatus = 'red' | 'green';
type RaceChip = { time: string; status: ChipStatus } | null;
type HorseRow = { venue: string; races: RaceChip[] };
type MeetingRow = { name: string; draws: RaceChip[] };

const Chip = ({ chip }: { chip: RaceChip }) => {
    if (!chip) {
        return (
            <View style={styles.colCell}>
                <Text style={styles.dash}>—</Text>
            </View>
        );
    }
    return (
        <View style={styles.colCell}>
            <View style={[styles.chip, { backgroundColor: chip.status === 'green' ? '#1D9E75' : '#E24B4A' }]}>
                <Text style={styles.chipText}>{chip.time}</Text>
            </View>
        </View>
    );
};

const SyncedTable = ({
    fixedWidth,
    fixedLabel,
    headers,
    rows,
    renderFixed,
    renderChips,
}: {
    fixedWidth: number;
    fixedLabel: string;
    headers: string[];
    rows: any[];
    renderFixed: (row: any) => string;
    renderChips: (row: any) => RaceChip[];
}) => {
    const scrollRefs = useRef<(ScrollView | null)[]>([]);
    const headerRef = useRef<ScrollView>(null);
    const isSyncing = useRef(false);

    const syncScroll = (x: number, sourceIndex: number | 'header') => {
        if (isSyncing.current) return;
        isSyncing.current = true;
        if (sourceIndex !== 'header') {
            headerRef.current?.scrollTo({ x, animated: false });
        }
        scrollRefs.current.forEach((ref, i) => {
            if (i !== sourceIndex) ref?.scrollTo({ x, animated: false });
        });
        setTimeout(() => { isSyncing.current = false; }, 50);
    };

    // Shared style for BOTH header and data fixed cells — guarantees same width/padding
    const fixedCellStyle = {
        width: fixedWidth,
        minWidth: fixedWidth,
        maxWidth: fixedWidth,
        paddingHorizontal: 12,
        justifyContent: 'center' as const,
        alignSelf: 'stretch' as const,
    };

    return (
        <View>
            {/* HEADER ROW */}
            <View style={styles.headerOuter}>
                <View style={[fixedCellStyle, styles.headerBg]}>
                    <Text style={styles.th}>{fixedLabel}</Text>
                </View>
                <View style={styles.divider} />
                <ScrollView
                    ref={headerRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    style={{ flex: 1 }}
                >
                    <View style={[styles.headerBg, { flexDirection: 'row', height: HEADER_H, alignItems: 'center', minWidth: '100%' }]}>
                        {headers.map((h, i) => (
                            <View key={i} style={styles.colCell}>
                                <Text style={[styles.th, { textAlign: 'center' }]}>{h}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* DATA ROWS */}
            {rows.map((row, rowIdx) => {
                const chips = renderChips(row);
                const maxCols = headers.length;
                return (
                    <View key={rowIdx} style={styles.dataOuter}>
                        {/* Fixed label — uses SAME fixedCellStyle as header */}
                        <View style={fixedCellStyle}>
                            <Text style={styles.cellLabel} numberOfLines={2}>
                                {renderFixed(row)}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <ScrollView
                            ref={ref => { scrollRefs.current[rowIdx] = ref; }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onScroll={e => syncScroll(e.nativeEvent.contentOffset.x, rowIdx)}
                            scrollEventThrottle={16}
                            style={{ flex: 1 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: ROW_H, minWidth: '100%' }}>
                                {chips.map((chip, j) => <Chip key={j} chip={chip} />)}
                                {Array.from({ length: maxCols - chips.length }).map((_, k) => (
                                    <Chip key={`e-${k}`} chip={null} />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                );
            })}
        </View>
    );
};

export const HorseRacingTable = ({ data }: { data: HorseRow[] }) => {
    const maxCols = Math.max(...data.map(r => r.races.length), 0);
    const headers = Array.from({ length: maxCols }, (_, i) => `Race ${i + 1}`);
    return (
        <SyncedTable
            fixedWidth={VENUE_W}
            fixedLabel="Venue"
            headers={headers}
            rows={data}
            renderFixed={row => row.venue}
            renderChips={row => row.races}
        />
    );
};

export const MeetingTable = ({ data }: { data: MeetingRow[] }) => {
    const maxCols = Math.max(...data.map(r => r.draws.length), 0);
    const headers = Array.from({ length: maxCols }, (_, i) => `Draw ${i + 1}`);
    return (
        <SyncedTable
            fixedWidth={MEETING_W}
            fixedLabel="Meeting"
            headers={headers}
            rows={data}
            renderFixed={row => row.name}
            renderChips={row => row.draws}
        />
    );
};

const styles = StyleSheet.create({
    headerOuter: {
        flexDirection: 'row',
        height: HEADER_H,
        alignItems: 'stretch',
    },
    dataOuter: {
        flexDirection: 'row',
        height: ROW_H,
        alignItems: 'stretch',
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    headerBg: {
        backgroundColor: 'rgba(37, 99, 255, 0.08)',
    },
    divider: {
        width: 0.5,
        backgroundColor: '#E0E0E0',
        alignSelf: 'stretch',
    },
    colCell: {
        width: CHIP_W,
        minWidth: CHIP_W,
        alignItems: 'center',
        justifyContent: 'center',
    },
    th: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: 'rgba(31, 35, 43, 0.7)',
    },
    cellLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#1F232B',
        lineHeight: 16,
    },
    chip: {
        minWidth: 52,
        paddingVertical: 5,
        paddingHorizontal: 4,
        borderRadius: 3,
        alignItems: 'center',
    },
    chipText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    dash: {
        fontSize: 13,
        fontWeight: '700',
        color: '#888',
    },
});