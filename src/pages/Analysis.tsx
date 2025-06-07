
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MapPin, Calendar, ZoomIn, X, Target, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const Analysis = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Calculate days left
  const submissionDate = new Date('2025-03-04');
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Tender bio data
  const tenderBio = {
    brief: "Upgradation of Package 12: Ujjain – Maksi Road in the state of Madhya Pradesh on Engineering, Procurement & Construction (EPC) Mode under proposed NDB Loan",
    location: "Ujjain, Madhya Pradesh",
    estimatedCost: "273.45 Cr.",
    emd: "2.73 Cr.",
    length: "38.95 km",
    type: "EPC Contract",
    downloadDocuments: "http://mptenders.gov.in",
    organisation: "M.P. State Highway Authority",
    organisationId: "12513/664/Procu./MPRDC/NDB/CW/2024",
    website: "http://mptenders.gov.in",
    submissionDeadline: "4 March 2025",
    compatibilityScore: 77
  };

  // Location insights data
  const locationInsights = [
    { 
      title: "Terrain", 
      content: `**Terrain Type**: Plain  
*Flat terrain in Ujjain-Maksi region provides favorable conditions for construction and material transport.*` 
    },
    { 
      title: "Climate", 
      content: `- **Climate Zone**: Humid Subtropical (Cwa)  
- **Suitable Working Season**: October to March (avoiding monsoon: June–September)  

*Dry winter months ensure stable conditions for earthwork and paving.*` 
    },
    { 
      title: "Logistics", 
      content: `**Logistical Difficulty**: Moderate  
**Reason**: Flat terrain in Ujjain-Maksi eases construction, but traffic management on this operational road and coordination in semi-urban/rural zones add complexity.

| Key Factor           | Impact                          |
|----------------------|---------------------------------|
| **Terrain**          | Favorable flat conditions      |
| **Road Operations**  | Traffic management required     |
| **Urban Zones**      | Coordination complexity         |` 
    },
    { 
      title: "Safety", 
      content: `| Risk Factor       | Level       |
|-------------------|-------------|
| **Overall Risk**  | **Moderate** |
| **Religious Significance** | High   |
| **Security**      | Low         |

- **Key Factors**:  
  - Ujjain's religious significance as a pilgrimage hub elevates terrorism vigilance
  - Madhya Pradesh has low recent security incidents
- **Current Advisory**:  
  Standard security protocols for pilgrimage areas

*Note: Increased vigilance during festival seasons due to pilgrimage activities.*` 
    },
    { 
      title: "Soil Type", 
      content: `- **Soil Type**: Predominantly **black cotton soil** (clay-rich, expansive nature)  
- **Rock Availability**: **Yes** – **Basalt rocks** abundantly available in the Malwa Plateau region, suitable for aggregates  

| Feature          | Details                          |
|------------------|----------------------------------|
| **Soil Type**    | Black cotton soil (expansive)    |
| **Rock Sources** | Basalt (Malwa Plateau region)    |` 
    },
    { 
      title: "Material Availability", 
      content: `- **Diesel/Petrol Pumps**: Available  
- **Cement Vendors**: Available  

*Typical availability along major highways and near urban centers like Ujjain/Maksi.*

**Current Site**: Existing 2-lane highway (7m-10m width) from km 00+000 to 38+950 spanning 38.95km in Madhya Pradesh.` 
    }
  ];

  // Citation links for location insights
  const locationCitationLinks = [
    {
      title: "Madhya Pradesh Infrastructure Development",
      url: "http://mptenders.gov.in"
    },
    {
      title: "Malwa Plateau Geological Survey",
      url: "https://www.gsi.gov.in/webcenter/portal/OCBIS"
    },
    {
      title: "MP Road Development Corporation Projects",
      url: "https://www.mprdc.nic.in"
    }
  ];

  // Nature of work content
  const workCategories = {
    'road-composition': `### Pavement Design Summary  

#### Pavement Types and Quantities  
| Pavement Type       | Length (Km) | Design Standard | Design Period |  
|---------------------|-------------|-----------------|---------------|  
| Flexible Pavement   | 27.550      | IRC:37-2019     | 20 years      |  
| Rigid Pavement      | 10.610      | IRC:58-2015     | 30 years      |  

#### Flexible Pavement Specifications  
**New Construction/Reconstruction/Widening**  
| Layer    | Thickness (mm) |  
|----------|----------------|  
| BC       | 40             |  
| DBM      | 70             |  
| WMM      | 150            |  
| CTSB     | 200            |  
| Subgrade | 500            |  

**Temporary Diversion at Structure Location**  
| Layer               | Thickness (mm) |  
|---------------------|----------------|  
| OGPC + Seal Coat    | 20             |  
| WMM                | 225            |  
| GSB                | 200            |  
| Subgrade           | 500            |  

#### Rigid Pavement Specifications  
**Reconstruction/Widening**  
| Layer    | Thickness (mm) |  
|----------|----------------|  
| PQC      | 300            |  
| DLC      | 150            |  
| GSB      | 150            |  
| Subgrade | 500            |  

### Typical Cross Section (TCS) Summary  

| TCS Type | Carriageway + Shoulder Configuration | Typical Length (m) | Area Type | Special Treatment |  
|----------|-------------------------------------|---------------------|-----------|------------------|  
| TCS 1    | 2 x 7.0 + 2 x 1.5                   | 18,306.6            | Open Area | Gilsonite Modified Emulsion Surface Treatment |  
| TCS 2    | 2 x 7.0 + 2 x 2.0                   | 5,105.3             | Built-up  | Standard Treatment |  
| TCS 3    | 2 x 7.0                             | 990                 | Built-up  | Standard Treatment |  
| TCS 4    | 7.0 + 2 x 2.5                       | 1,350               | Open Area | Gilsonite Modified Emulsion Surface Treatment |  

#### Design Requirements  
- **Design Traffic**: Minimum 50 MSA (subject to actual traffic assessment)  
- **Stage Construction**: Not permitted  
- **Fly-ash Usage**: As per MPPWD/GoMP circulars`,
    
    'roadside-drainage': `### Roadside Drainage Specifications  

| **Component**               | **Details**                                                                 |
|-----------------------------|----------------------------------------------------------------------------|
| **Connection to Water Bodies** | Roadside drains to be connected to existing ponds or water harvesting pits |
| **Design Standard**         | MORT&H Specifications for Road and Bridge Works (1986)                     |
| **Drainage Enhancement**    | Existing drainage system to be maintained and enhanced                     |
| **Cross Drainage**          | Adequate size/number of structures in sloped areas                         |
| **Road Elevation**          | Raised above HFL where road level is lower                                 |
| **Silt Control**            | Silt fencing along ponds; slopes modified to restrict debris               |
| **Material Reuse**          | Collected sediment reused for slope surfacing/vegetation                   |

### Mitigation Measures  
- **Oil/Grease Control**: Oil interceptors at refueling/wash areas; traps and platforms for spills  
- **Waste Disposal**: Non-bituminous waste in borrow pits; bituminous waste to approved sites  
- **Water Quality**: Monitoring of ponds/streams; no refueling near water bodies  

### Institutional Responsibility  
| **Activity**               | **Implementation** | **Supervision** |
|----------------------------|--------------------|--------------------|
| Drainage Construction      | Contractor         | AE/MPRDC        |
| Silt Fencing               | Contractor         | AE/MPRDC        |
| Water Quality Monitoring   | Contractor         | AE/MPRDC        |`,
    
    'structures-work': `### Reconstruction of Box Culverts (5 Nos.)
| Existing Chainage | Design Chainage | Existing Type | Existing Span | Proposed Type | Proposed Span (No. x L x H) | Width (m) |
|------------------|----------------|---------------|--------------|---------------|----------------------------|----------|
| 00+980 | 00+980 | Box Culvert | 1x4.0 | Box Culvert | 1x4.0x2.0 | 24 |
| 01+145 | 01+145 | HPC | 3x1000 | Box Culvert | 2x2.0x2.0 | 24 |
| 11+800 | 11+800 | HPC | 1x1000 | Box Culvert | 1x3.0x3.0 | 24 |
| 17+025 | 17+025 | HPC | 1x1000 | Box Culvert | 1x3.0x2.0 | 24 |
| 17+260 | 17+260 | HPC | 1x1000 | Box Culvert | 1x3.0x2.0 | 24 |

### Widening of Slab/Box Culverts (23 Nos.)
| Existing Chainage | Design Chainage | Type | Existing Span (No. x L) | Existing Width (m) | Proposed Width (m) | Remark |
|------------------|----------------|------|-----------------------|-------------------|--------------------|--------|
| 04+035 | 04+035 | Box Culvert | 1X4.5 | 12 | 24 | TCS-2 |
| 08+550 | 08+550 | Box Culvert | 1X3.0 | 12 | 24 | TCS-1 |
| 08+960 | 08+960 | Box Culvert | 1X3.0 | 12 | 24 | TCS-3 |
| 09+655 | 09+655 | Box Culvert | 1X3.0 | 12 | 24 | TCS-2 |

### New Pipe Culverts (11 Nos.)
| Design Chainage | No. x Dia (mm) | Width (m) | Type | Remark |
|----------------|----------------|----------|------|--------|
| 4+770 | 2X1200 | 26 | HPC | TCS-2 |
| 5+500 | 1X1200 | 26 | HPC | TCS-2 |
| 10+390 | 2X1200 | 26 | HPC | TCS-2 |
| 13+950 | 1X1200 | 26 | HPC | TCS-1 |

### Reconstruction of Bridges
#### Major Bridge (1 No.)
| Existing Chainage | Design Chainage | Existing Type | Existing Span (No. x L) | Existing Width (m) | Proposed Span (No. x L) | Proposed Width (m) |
|------------------|----------------|---------------|------------------------|-------------------|------------------------|-------------------|
| 02+960 | 02+960 | MJB | 4x15 | 8.4 | 4x15 | 13+13 |

### New Bridges
#### Major Bridges (2 Nos.)
| Design Chainage | Span Arrangement (No. x L) | Width (m) | Remark |
|----------------|---------------------------|----------|--------|
| 24+825 | 6x10.4 | 13 | RETAIN + LHS NEW CONSTRUCTION |
| 32+140 | 6x10.4 | 13 | RETAIN + LHS NEW CONSTRUCTION |

#### Minor Bridges (4 Nos.)
| Design Chainage | Span Arrangement (No. x L) | Width (m) | Remark |
|----------------|---------------------------|----------|--------|
| 9+200 | 1x10.0 | 13 | RETAIN + RHS NEW CONSTRUCTION |
| 23+300 | 2x8.4 | 13 | RETAIN + RHS NEW CONSTRUCTION |
| 31+915 | 1x10.0 | 13 | RETAIN + LHS NEW CONSTRUCTION |
| 33+285 | 2x9.0 | 13 | RETAIN + RHS NEW CONSTRUCTION |`,
    
    'protection-work': `### Protection Work Details  

| Work Item          | Type               | Measurement/Quantity | Maintenance Timeframe |  
|--------------------|--------------------|----------------------|-----------------------|  
| Retaining Wall     | [Not specified]    | [Not specified]      | 7 days for repairs    |  
| Breast Wall        | [Not specified]    | [Not specified]      | 7 days for repairs    |  

### Maintenance Criteria for Hill Roads  
- **Landslide Clearance**: 12 hours  
- **Snow Clearance**: 24 hours  

### Standards & Specifications  
- **Applicable Standards**: BIS, IRC, MoRTH  
- **Maintenance Binding**: Yes  

### Footpaths on Bridges
| Location (Km) | Width (m) | Remarks |
|---------------|----------|---------|
| 02+960 | 1.5 | BHS Footpath |
| 09+200 | 1.5 | One side Footpath |
| 24+825 | 1.5 | One side Footpath |
| 31+915 | 1.5 | One side Footpath |
| 32+140 | 1.5 | One side Footpath |
| 33+285 | 1.5 | One side Footpath |

**Note**: No detailed measurements, types, or quantities found for protection works in the provided content.`
  };

  // Payment weightage content
  const paymentWeightageContent = `### Road Works (60.10%)
| Sub-Work | Stage | Weightage |
|----------|-------|-----------|
| Widening and strengthening of existing road | Widening and repair of culverts | 4.45% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Earthwork up to top of embankment | 1.19% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Sub-Grade | 3.21% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Sub base course | 4.61% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Non-Bituminous base course | 6.89% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Bituminous Base Course | 20.36% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Wearing Coat | 16.35% |
| Reconstruction/New realignment/bypass (Flexible pavement) | Earthen Shoulder | 0.74% |
| Reconstruction/New realignment/bypass (Rigid pavement) | Earthwork up to top of embankment | 0.51% |
| Reconstruction/New realignment/bypass (Rigid pavement) | Sub-Grade | 1.10% |
| Reconstruction/New realignment/bypass (Rigid pavement) | Sub base course | 2.03% |
| Reconstruction/New realignment/bypass (Rigid pavement) | Dry lean concrete (DLC) Course | 5.92% |
| Reconstruction/New realignment/bypass (Rigid pavement) | Pavement Quality Control (PQC) Course | 30.13% |
| Re-Construction and New Culvert on existing road, realignment, bypass | Culvert (length < 06 m) | 2.49% |

### Minor Bridges/Underpasses/Overpasses (2.41%)
| Sub-Work | Stage | Weightage |
|----------|-------|-----------|
| Widening and Repair of Minor Bridges (length > 06 m and < 60 m) | Foundation: On completion of the foundation work of abutments and piers | 4.85% |
| Widening and Repair of Minor Bridges (length > 06 m and < 60 m) | Sub-structure: On completion of abutments and piers with abutment/ pier cap | 3.67% |
| Widening and Repair of Minor Bridges (length > 06 m and < 60 m) | Super-structure: On completion of the super-structure in all respects | 2.82% |
| Widening and Repair of Minor Bridges (length > 06 m and < 60 m) | Approaches: On completion of approaches | 1.02% |
| New Minor Bridges (length >6m and <60m) | Foundation: On completion of the foundation work of abutments and piers | 29.78% |
| New Minor Bridges (length >6m and <60m) | Sub-structure: On completion of abutments and piers with abutment/ pier cap | 27.70% |
| New Minor Bridges (length >6m and <60m) | Super-structure: On completion of super structure upto deck slab including bearings | 17.28% |
| New Minor Bridges (length >6m and <60m) | Approaches: On completion of approaches | 5.42% |

### Major Bridge Works (3.73%)
| Sub-Work | Stage | Weightage |
|----------|-------|-----------|
| New Construction of Major bridges | Foundation | 30.44% |
| New Construction of Major bridges | Sub-structure | 21.24% |
| New Construction of Major bridges | Super structure (including Bearings) | 33.60% |
| New Construction of Major bridges | Wearing coat including expansion joints | 3.32% |
| New Construction of Major bridges | Wing wall/return wall | 0.50% |
| New Construction of Major bridges | Approach (including Retaining walls, stone pitching and protection works) | 5.36% |
| New Construction of Major bridges | Other | 1.35% |

### Other Works (24.22%)
| Sub-Work | Stage | Weightage |
|----------|-------|-----------|
| Drain | Unlined | 0.55% |
| Drain | Built Up (RCC Box Type Drain) & in Hill section | 22.42% |
| Drain | Paver Block | 0.37% |
| Road signs, Road marking, safety device etc | - | 3.42% |
| Project facilities | Bus Bays & Shelter | 5.56% |
| Project facilities | Overhead/Cantilever gantry sign boards | 0.69% |
| Project facilities | Street Lighting (Built-up, Grade Seperator, ROB) | 5.94% |
| Project facilities | Km Stone, Boundry Pillar , Guard stone | 0.03% |
| Project facilities | Road Markers/Road Stud with Lense Reflector | 7.39% |
| Project facilities | Junction improvement | 6.08% |
| Project facilities | Site clearance and dismantling | 1.71% |
| Project facilities | Utility Ducts across the road | 1.68% |
| Project facilities | Median/New Jersey type crash barriers | 24.96% |
| Project facilities | Road Side Plantation | 2.35% |
| Project facilities | Thrie-Beam Crash Barrier | 8.11% |
| Project facilities | Road Rolling Barrier | 6.17% |
| Project facilities | Running & Operation cost of IMS during O&M Period | 0.76% |
| Project facilities | Rain Water Harvesting | 1.77% |

### Shifting of Utility Services (9.53%)
| Sub-Work | Stage | Weightage |
|----------|-------|-----------|
| Electrical Utilities | - | 28.47% |
| Water Supply Utilities | - | 71.53% |`;

  // Compatibility Analysis content
  const compatibilityAnalysisContent = `### Executive Summary

**Overall Compatibility Score: 77/100** - This tender represents a good match for your organization's capabilities and strategic objectives in highway infrastructure development.

### Strengths & Opportunities

#### Technical Compatibility ✅
- **Highway Upgrade Expertise**: Strong alignment with your company's core competencies in highway widening and upgradation projects
- **EPC Model Experience**: Your organization has demonstrated success in Engineering, Procurement, and Construction contracts
- **Flexible & Rigid Pavement**: Experience with both pavement types provides competitive advantage for this mixed-specification project

#### Financial Viability ✅
- **Project Scale**: ₹273.45 Cr. contract value aligns well with your typical project portfolio
- **EMD Requirement**: ₹2.73 Cr. EMD is within manageable limits for your financial capacity
- **Payment Structure**: Well-distributed payment weightage across work components provides steady cash flow

### Challenges & Risk Factors

#### Operational Complexity ⚠️
| Challenge | Impact Level | Mitigation Strategy |
|-----------|--------------|-------------------|
| **Traffic Management** | High | Phased construction with traffic diversions |
| **Urban Coordination** | Medium | Early stakeholder engagement in Ujjain |
| **Utility Shifting** | Medium | Coordinate with utility agencies early |

#### Technical Considerations ⚠️
- **Black Cotton Soil**: Requires specialized treatment for foundation work
- **Mixed Pavement Types**: 27.55km flexible + 10.61km rigid pavement coordination
- **Multiple Structures**: 40+ bridges/culverts requiring careful sequencing

### Recommendation Matrix

| Criteria | Score | Rationale |
|----------|-------|-----------|
| **Technical Fit** | 8/10 | Excellent match with highway upgrade experience |
| **Financial Viability** | 8/10 | Appropriate scale, manageable EMD, good payment terms |
| **Risk Profile** | 7/10 | Moderate risks with manageable mitigation strategies |
| **Strategic Value** | 8/10 | Enhances MP market presence, government relationship |
| **Resource Availability** | 7/10 | Standard highway construction resources available |

### Strategic Recommendations

#### Proceed with Aggressive Bid ✅
**Rationale**: Excellent strategic fit with manageable technical and financial risks. Strong potential for successful execution.

#### Key Success Factors
1. **Traffic Management Plan**: Develop comprehensive phased construction approach
2. **Utility Coordination**: Establish early partnerships with utility service providers
3. **Material Planning**: Secure cement and aggregate sources from local Malwa region
4. **Quality Control**: Implement robust QC for mixed pavement specifications

#### Bid Strategy Recommendations
- **Competitive Pricing**: Target aggressive pricing given excellent fit
- **Local Partnerships**: Emphasize local employment and material sourcing
- **Technology Integration**: Propose advanced project monitoring systems
- **Fast Track Delivery**: Highlight efficient project delivery capabilities

### Conclusion

This tender represents an **excellent opportunity** with strong alignment to your capabilities. The combination of favorable terrain, good material availability, and your technical expertise creates optimal conditions for successful project delivery.

**Recommendation**: **STRONGLY PROCEED** with bid preparation and aggressive pricing strategy.`;

  const siteImages = [
    { 
      id: '1', 
      src: 'https://worldtiles1.waze.com/tiles/17/93135/56855.png?highres=true', 
      title: 'Ujjain-Maksi Route Overview', 
      location: 'Highway Section', 
      date: '2024-03-15',
      link: 'https://worldtiles1.waze.com/tiles/17/93135/56855.png?highres=true'
    },
    { 
      id: '2', 
      src: 'https://worldtiles1.waze.com/tiles/17/93136/56856.png?highres=true', 
      title: 'Road Infrastructure', 
      location: 'Ujjain District', 
      date: '2024-03-14',
      link: 'https://worldtiles1.waze.com/tiles/17/93136/56856.png?highres=true'
    },
    { 
      id: '3', 
      src: 'https://img.staticmb.com/mbphoto/locality/original_images/2021/Dec/24/107306_MAP.png', 
      title: 'Area Development Map', 
      location: 'Madhya Pradesh', 
      date: '2024-03-13',
      link: 'https://img.staticmb.com/mbphoto/locality/original_images/2021/Dec/24/107306_MAP.png'
    },
    { 
      id: '4', 
      src: 'https://worldtiles1.waze.com/tiles/17/93136/56855.png?highres=true', 
      title: 'Regional Context', 
      location: 'Highway Corridor', 
      date: '2024-03-12',
      link: 'https://worldtiles1.waze.com/tiles/17/93136/56855.png?highres=true'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return { 
      color: 'text-green-600', 
      bgColor: 'from-green-400 to-green-600',
      icon: TrendingUp,
      label: 'Excellent Match'
    };
    if (score >= 50) return { 
      color: 'text-yellow-600', 
      bgColor: 'from-yellow-400 to-yellow-600',
      icon: Target,
      label: 'Good Match'
    };
    return { 
      color: 'text-red-600', 
      bgColor: 'from-red-400 to-red-600',
      icon: AlertTriangle,
      label: 'Poor Match'
    };
  };

  const scoreData = getScoreColor(tenderBio.compatibilityScore);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (tenderBio.compatibilityScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Tender Biography</CardTitle>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${daysLeft > 30 ? 'text-green-600' : daysLeft > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                    </div>
                    <div className="text-sm text-gray-500">to submit</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">{tenderBio.brief}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Submission Date</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.submissionDeadline}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Estimated Cost</p>
                    <p className="font-semibold text-teal-700 text-sm">₹{tenderBio.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">EMD</p>
                    <p className="font-medium text-gray-700 text-sm">₹{tenderBio.emd}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Length</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Download Documents</p>
                    <a 
                      href={tenderBio.downloadDocuments} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Download <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.organisation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation ID</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.organisationId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                    <a 
                      href={tenderBio.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Score */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Compatibility Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <div className="relative group">
                  <div className="w-32 h-32 mx-auto relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200" />
                      <circle
                        cx="50" cy="50" r="45"
                        stroke="url(#scoreGradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-in-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className="stop-color-teal-400" />
                          <stop offset="100%" className="stop-color-blue-600" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`text-3xl font-bold ${scoreData.color} mb-1`}>
                        {tenderBio.compatibilityScore}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">out of 100</div>
                      <scoreData.icon className={`w-5 h-5 mt-1 ${scoreData.color}`} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{scoreData.label}</div>
                      <div className="text-gray-300 mt-1">Based on your profile match</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Insights Panel */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Location Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {locationInsights.map((insight, index) => (
                  <Card key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-teal-700 mb-3 text-sm">{insight.title}</h4>
                      <ScrollArea className="h-24">
                        <MarkdownRenderer content={insight.content} className="text-xs" />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Citations Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Citations - </span>
                  <div className="mt-2 space-y-1">
                    {locationCitationLinks.map((link, index) => (
                      <div key={index}>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 underline text-xs flex items-center"
                        >
                          {link.title} <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nature of Work Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Nature of Work</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="road-composition">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger 
                    value="road-composition"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Road Composition
                  </TabsTrigger>
                  <TabsTrigger 
                    value="roadside-drainage" 
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Roadside Drainage
                  </TabsTrigger>
                  <TabsTrigger 
                    value="structures-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Structures Work
                  </TabsTrigger>
                  <TabsTrigger 
                    value="protection-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Protection Work
                  </TabsTrigger>
                </TabsList>
                
                {Object.entries(workCategories).map(([category, content]) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <ScrollArea className="h-96 p-6">
                        <MarkdownRenderer content={content} />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Payment Weightage Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Payment Weightage by Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={paymentWeightageContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Analysis Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Compatibility Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={compatibilityAnalysisContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Site Images Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {siteImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open(image.link, '_blank')}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-medium text-xs truncate">{image.title}</h4>
                      <div className="flex items-center text-xs text-gray-200 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {image.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
