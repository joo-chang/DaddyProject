import { TimelineData, NodeType } from '../types';

// 샘플 타임라인 데이터 생성
export const sampleTimelineData: TimelineData = {
  nodes: [
    // 세기 노드
    { 
      id: 'century_-1', 
      type: NodeType.CENTURY, 
      position: { x: 0, y: 100 }, 
      data: { 
        label: '기원전 1세기', 
        century: -1 
      } 
    },
    { 
      id: 'century_1', 
      type: NodeType.CENTURY, 
      position: { x: 0, y: 200 }, 
      data: { 
        label: '1세기', 
        century: 1 
      } 
    },
    { 
      id: 'century_20', 
      type: NodeType.CENTURY, 
      position: { x: 0, y: 300 }, 
      data: { 
        label: '20세기', 
        century: 20 
      } 
    },
    
    // 연도 노드 - 기원전 1세기
    { 
      id: 'year_-44', 
      type: NodeType.YEAR, 
      position: { x: 250, y: 50 }, 
      data: { 
        label: '기원전 44년', 
        year: -44, 
        century: -1 
      } 
    },
    { 
      id: 'year_-27', 
      type: NodeType.YEAR, 
      position: { x: 250, y: 150 }, 
      data: { 
        label: '기원전 27년', 
        year: -27, 
        century: -1 
      } 
    },
    
    // 연도 노드 - 1세기
    { 
      id: 'year_14', 
      type: NodeType.YEAR, 
      position: { x: 250, y: 200 }, 
      data: { 
        label: '14년', 
        year: 14, 
        century: 1 
      } 
    },
    
    // 연도 노드 - 20세기
    { 
      id: 'year_1914', 
      type: NodeType.YEAR, 
      position: { x: 250, y: 250 }, 
      data: { 
        label: '1914년', 
        year: 1914, 
        century: 20 
      } 
    },
    { 
      id: 'year_1945', 
      type: NodeType.YEAR, 
      position: { x: 250, y: 350 }, 
      data: { 
        label: '1945년', 
        year: 1945, 
        century: 20 
      } 
    },
    
    // 역사적 사건/인물 노드 - 기원전 44년
    { 
      id: 'event_caesar_death', 
      type: NodeType.EVENT, 
      position: { x: 500, y: 50 }, 
      data: { 
        label: '카이사르 암살', 
        type: 'event', 
        year: -44, 
        details: '율리우스 카이사르가 원로원에서 브루투스를 포함한 암살단에 의해 살해되었다. 로마 공화정의 실질적인 종말을 의미했다.'
      } 
    },
    
    // 역사적 사건/인물 노드 - 기원전 27년
    { 
      id: 'person_augustus', 
      type: NodeType.PERSON, 
      position: { x: 500, y: 150 }, 
      data: { 
        label: '아우구스투스 즉위', 
        type: 'person', 
        year: -27, 
        details: '옥타비아누스가 아우구스투스라는 이름을 받으며 로마의 초대 황제가 되었다. 로마 제국의 시작을 의미한다.'
      } 
    },
    
    // 역사적 사건/인물 노드 - 14년
    { 
      id: 'event_augustus_death', 
      type: NodeType.EVENT, 
      position: { x: 500, y: 200 }, 
      data: { 
        label: '아우구스투스 서거', 
        type: 'event', 
        year: 14, 
        details: '로마 제국의 초대 황제 아우구스투스가 사망하고 티베리우스가 로마 황제로 즉위했다.'
      } 
    },
    
    // 역사적 사건/인물 노드 - 1914년
    { 
      id: 'event_ww1_start', 
      type: NodeType.EVENT, 
      position: { x: 500, y: 250 }, 
      data: { 
        label: '제1차 세계대전 발발', 
        type: 'event', 
        year: 1914, 
        details: '오스트리아-헝가리 제국의 페르디난트 대공 암살을 계기로 제1차 세계대전이 시작되었다.'
      } 
    },
    
    // 역사적 사건/인물 노드 - 1945년
    { 
      id: 'event_ww2_end', 
      type: NodeType.EVENT, 
      position: { x: 500, y: 300 }, 
      data: { 
        label: '제2차 세계대전 종전', 
        type: 'event', 
        year: 1945, 
        details: '일본의 항복으로 제2차 세계대전이 종결되었다. 미국이 히로시마와 나가사키에 원자폭탄을 투하한 이후 일본은 무조건 항복했다.'
      } 
    },
    { 
      id: 'idea_un_creation', 
      type: NodeType.IDEA, 
      position: { x: 500, y: 350 }, 
      data: { 
        label: '국제연합(UN) 창설', 
        type: 'idea', 
        year: 1945, 
        details: '제2차 세계대전 이후 국제 평화와 안보를 유지하기 위해 국제연합(UN)이 설립되었다.'
      } 
    },
  ],
  edges: [
    // 세기 -> 연도 연결
    { id: 'e1', source: 'century_-1', target: 'year_-44', type: 'smoothstep' },
    { id: 'e2', source: 'century_-1', target: 'year_-27', type: 'smoothstep' },
    { id: 'e3', source: 'century_1', target: 'year_14', type: 'smoothstep' },
    { id: 'e4', source: 'century_20', target: 'year_1914', type: 'smoothstep' },
    { id: 'e5', source: 'century_20', target: 'year_1945', type: 'smoothstep' },
    
    // 연도 -> 역사적 사건/인물 연결
    { id: 'e6', source: 'year_-44', target: 'event_caesar_death', type: 'smoothstep' },
    { id: 'e7', source: 'year_-44', target: 'event_caesar_death', type: 'smoothstep' },
    { id: 'e8', source: 'year_-44', target: 'event_caesar_death', type: 'smoothstep' },
    { id: 'e9', source: 'year_-27', target: 'person_augustus', type: 'smoothstep' },
    { id: 'e10', source: 'year_14', target: 'event_augustus_death', type: 'smoothstep' },
    { id: 'e11', source: 'year_1914', target: 'event_ww1_start', type: 'smoothstep' },
    { id: 'e12', source: 'year_1945', target: 'event_ww2_end', type: 'smoothstep' },
    { id: 'e13', source: 'year_1945', target: 'idea_un_creation', type: 'smoothstep' },
  ]
}; 