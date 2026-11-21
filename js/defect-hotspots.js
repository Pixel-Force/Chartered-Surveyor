/* ==========================================================================
   Chartered Surveyor — Interactive Defect Diagnostic Hotspots
   Clickable architectural pins to inspect common structural property flaws
   ========================================================================== */

const defectData = {
  1: {
    category: 'Chimney Stacks & Lead Flashing',
    title: 'Perished Mortar & Spalling Chimney Masonry',
    description: 'High-level masonry stacks endure severe freeze-thaw cycles. Open mortar joints and defective stepped lead flashings allow water ingress straight into ceiling timbers and loft spaces below.',
    riskTitle: 'Condition Rating 3: Serious Defect',
    riskText: 'Potential chimney breast collapse or continuous rot in purlins. Scaffolding and rebuild cost typically ranges between £3,500 - £7,000.',
    surveyLevel: 'Level 2 & Level 3 Inspection with 4K Drone Aerial Zoom'
  },
  2: {
    category: 'Roof Valleys & Coverings',
    title: 'Slipped Slate Tiles & Failed Valley Gutters',
    description: 'Hidden valley gutters choked with moss or cracked lead gutters create concentrated rainwater dams. We inspect pitch alignment, rafter spread, and nail fatigue in pre-1950 roofs.',
    riskTitle: 'Condition Rating 3: Urgent Waterproofing Required',
    riskText: 'Internal plaster ceiling collapses and wet rot in principal roof trusses. Average repair savings discovered: £4,200.',
    surveyLevel: 'Comprehensive RICS Level 3 Structural Survey'
  },
  3: {
    category: 'External Walls & Structural Movement',
    title: 'Stepped Diagonal Cracking & Clay Subsidence',
    description: 'Distinct diagonal stepped fracture lines through external brickwork often correlate to subsoil shrinkage from nearby mature willow or oak trees, or ruptured sub-surface drainage runs.',
    riskTitle: 'Condition Rating 3: Structural Underpinning Risk',
    riskText: 'Lender mortgage refusal unless structural adequacy and crack monitoring report is produced. Remediation costs £15,000 - £60,000.',
    surveyLevel: 'Specialist Forensic Defect Diagnosis'
  },
  4: {
    category: 'Damp Proof Course & Sub-Floor Voids',
    title: 'Bridged DPC & Sub-Floor Airbrick Blockage',
    description: 'Patios or flowerbeds raised above the physical damp-proof course line bridge moisture into inner masonry. Blocked telescopic vents cause stagnant high-humidity voids resulting in Dry Rot (Serpula lacrymans).',
    riskTitle: 'Condition Rating 2 / 3: Timber Decay Hazard',
    riskText: 'Spreading fungal decay beneath suspended floorboards. Remedial chemical barrier and floor timber replacement £2,500 - £5,000.',
    surveyLevel: 'Protimeter Surveymaster Electronic Moisture Profiling'
  },
  5: {
    category: 'Fenestration & Load-Bearing Lintels',
    title: 'Failed Window Lintels & Rotting Timber Sills',
    description: 'Historical replacement of original timber sashes with lightweight UPVC units without installing retrofitted prestressed concrete or steel Catnic lintels, resulting in dropping brickwork arches above.',
    riskTitle: 'Condition Rating 2: Structural Support Defect',
    riskText: 'Masonry distortion above window frames and draught ingress. Installation of helifix bars or new lintels costs £1,200 - £3,000.',
    surveyLevel: 'Included in Level 2 and Level 3 Building Surveys'
  }
};

class DefectHotspots {
  constructor() {
    this.pins = document.querySelectorAll('.hotspot-pin');
    this.badge = document.querySelector('.defect-panel-badge');
    this.title = document.querySelector('.defect-panel-title');
    this.desc = document.querySelector('.defect-panel-desc');
    this.riskTitle = document.querySelector('.defect-risk-title');
    this.riskText = document.querySelector('.defect-risk-text');

    if (!this.pins.length || !this.title) return;

    this.init();
  }

  init() {
    this.pins.forEach(pin => {
      pin.addEventListener('click', () => {
        const id = pin.dataset.id;
        this.selectHotspot(id);
      });
    });
  }

  selectHotspot(id) {
    this.pins.forEach(p => p.classList.remove('active'));
    const activePin = document.querySelector(`.hotspot-pin[data-id="${id}"]`);
    if (activePin) activePin.classList.add('active');

    const data = defectData[id];
    if (!data) return;

    // Smooth update
    if (this.badge) this.badge.textContent = data.category;
    if (this.title) this.title.textContent = data.title;
    if (this.desc) this.desc.textContent = data.description;
    if (this.riskTitle) this.riskTitle.textContent = data.riskTitle;
    if (this.riskText) this.riskText.textContent = data.riskText;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DefectHotspots();
});
