import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Tender } from "@/context/tenderContext";
import MarkdownRenderer from "@/components/analysis/MarkdownRenderer";
import BioAndScore from "./BioAndScore";
import CurrentSite from "./CurrentSite";
import LocationInsights from "./LocationInsights";
import CompatibilityAnalysis from "./CompatibilityAnalysis";
import SiteImages from "./SiteImages";
import BOQRenderer from "./BOQRenderer";
import { isObjEmpty } from "@/helpers";

const ItemRateAnalysis = ({ tenderData }: { tenderData: Tender }) => {
  const navigate = useNavigate();

  // Item-Rate Nature of Work categories (only 3)
  const workCategories = {
    "road-works": tenderData?.metadata?.markdownRoadWorks,
    "structures-work":
      tenderData?.metadata?.structures ||
      tenderData?.metadata?.markdownStructure,
    "roadside-furniture": tenderData?.metadata?.markdownRoadsideFurniture,
  };

  type BOQItem = {
    "Serial Number": number;
    "Item Description": string;
    Quantity: number | null;
    Units: string;
    "Estimated Rate": number | null;
    "Total Amount (Rs.)": number | null;
  };

  //   const boqContent = `### Bill of Quantities (BOQ)

  // | Item Code | Description | Unit | Quantity | Rate | Amount |
  // |-----------|-------------|------|----------|------|---------|
  // | 001 | Excavation in ordinary soil | Cum | 1500 | ₹250 | ₹3,75,000 |
  // | 002 | Concrete Grade M25 | Cum | 500 | ₹4500 | ₹22,50,000 |
  // | 003 | Steel Reinforcement | MT | 25 | ₹65000 | ₹16,25,000 |
  // | 004 | Bituminous Concrete | Cum | 800 | ₹8500 | ₹68,00,000 |
  // | 005 | Road Safety Equipment | LS | 1 | ₹25,00,000 | ₹25,00,000 |

  // ### Total Project Cost: ₹1,35,50,000`;

  const categories = {
    "Road works (including pavement)": [
      {
        "Serial Number": 1.0,
        "Item Description":
          "Clearing and Grubbing Road Land (Clearing and grubbing road land including uprooting rank vegetation, grass, bushes, shrubs, saplings and trees girth up to 300 mm, removal of stumps of trees cut earlier and disposal of unserviceable materials and stacking of serviceable material to be used or auctioned up to a lead of 1000 metres including removal and disposal of top organic soil not exceeding 150 mm in thickness.)\n(II) By Mechanical Means",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 1.01,
        "Item Description": "In area of light jungle",
        Quantity: 23.16,
        Units: "hectare",
        "Estimated Rate": 22918.0,
        "Total Amount (Rs.)": 530780.88,
      },
      {
        "Serial Number": 3.0,
        "Item Description":
          "Dismantling of Flexible Pavements \nDismantling of flexible pavements and disposal of dismantled \nmaterials up to a lead of 1000 metres, stacking serviceable and \nunserviceable materials separately.",
        Quantity: 650.0,
        Units: "cum",
        "Estimated Rate": 230.0,
        "Total Amount (Rs.)": 149500.0,
      },
      {
        "Serial Number": 4.0,
        "Item Description":
          "Excavation in Soil using Hydraulic Excavator CK 90 and Tippers with disposal upto 1000 metres. (Excavation for roadwork in soil with hydraulic excavator of0.9 cum bucket capacity including cutting and loading in tippers, trimming bottom and side slopes, in accordance with requirements of lines, grades and cross sections, and transporting to the embankment location within all lifts and lead upto 1000m) ",
        Quantity: 17041.1,
        Units: "cum",
        "Estimated Rate": 55.0,
        "Total Amount (Rs.)": 937260.4999999999,
      },
      {
        "Serial Number": 5.0,
        "Item Description":
          "Excavation in Ordinary Rock using Hydraulic Excavator  and Tippers cum 63.00 with disposal upto 1000 metres (Excavation for roadway in ordinary rock with hydraulic excavator including cutting and loading in tippers, transporting to embankment site with in all lifts and lead upto 1000 m, trimming bottom and side slopes in accordance with requirements of lines, grades and cross sections as per relevent clauses of section-300 of specification.)",
        Quantity: 5814.94,
        Units: "cum",
        "Estimated Rate": 75.0,
        "Total Amount (Rs.)": 436120.49999999994,
      },
      {
        "Serial Number": 6.0,
        "Item Description":
          "Excavation in Hard Rock with disposal upto 1000 metres  cum 182.00 Excavation for roadway in hard rock with rock breakers i/c breaking rock or by drilling, blasting and breaking, trimming of bottom and side slopes in accordance with requirements of lines, grades and cross sections, loading and disposal of cut road with all lifts and leads upto 1000 metres and as per relevent clauses of section-300 of specification. ",
        Quantity: 7268.68,
        Units: "cum",
        "Estimated Rate": 203.0,
        "Total Amount (Rs.)": 1475542.04,
      },
      {
        "Serial Number": 7.0,
        "Item Description":
          "Embankment Construction with Material Obtained from Borrow Pits (Construction of embankment with approved material obtained from borrow pits with all lifts and leads, transporting to site, spreading, grading to required slope and compacting to meet requirement of table 300-2)",
        Quantity: 929534.25,
        Units: "cum",
        "Estimated Rate": 155.0,
        "Total Amount (Rs.)": 144077808.75,
      },
      {
        "Serial Number": 8.0,
        "Item Description":
          "Construction of Embankment with Material Deposited from Roadway Cutting (Construction of embankment with approved materials deposited at site from roadway cutting and excavation from drain and foundation of other structures graded and compacted to meet requirement of table 300-2)",
        Quantity: 13083.63,
        Units: "cum",
        "Estimated Rate": 60.0,
        "Total Amount (Rs.)": 785017.7999999999,
      },
      {
        "Serial Number": 9.0,
        "Item Description":
          "Construction of Subgrade Construction of embankment with approved material having from borrow pits with all lifts and leads, transporting to site, spreading, grading to required slope and compacting to meet\nrequirement of table 300-1, 300-2 and as per relevent clauses of\nsection-300.",
        Quantity: 161446.7,
        Units: "cum",
        "Estimated Rate": 186.0,
        "Total Amount (Rs.)": 30029086.200000003,
      },
      {
        "Serial Number": 10.0,
        "Item Description":
          "Surface Drains in Soil (Construction of unlined surface drains of average cross sectional area 0.40 sqm in soil to specified lines, grades, levels and dimensions to the requirement of clause 301 and 309. Excavated material to be used in embankment within a lead of50 metres (average lead 25 metres))\nMechanical means",
        Quantity: 39926.0,
        Units: "metre",
        "Estimated Rate": 67.0,
        "Total Amount (Rs.)": 2675042.0,
      },
      {
        "Serial Number": 11.0,
        "Item Description":
          "Construction of Shoulders  with approved material/selected soil\ni/c excavation all lifts & leads i/c grading to required slope &\ncamber of 4% and compacting using vibratory roller of 80 to 100kN static weight to meet requirement as per relevant clause of 400.\nEarthen Shoulders (CBR value >7)",
        Quantity: 24132.95,
        Units: "cum",
        "Estimated Rate": 186.0,
        "Total Amount (Rs.)": 4488728.7,
      },
      {
        "Serial Number": 12.0,
        "Item Description":
          "Construction of Median and Island above road level with \napproved material deposited at site from roadway cutting and \nexcavation for drain and foundation of other structures, spread, \ngraded and compacted as per clause 408 of specification",
        Quantity: 547.67,
        Units: "cum",
        "Estimated Rate": 141.0,
        "Total Amount (Rs.)": 77221.47,
      },
      {
        "Serial Number": 13.0,
        "Item Description":
          "Footpaths and Separators\nConstruction of footpath/ separator by providing a 150 mm\ncompacted granular sub base as per clause 401 and 25 mm thick\ncement concrete grade M15, over laid with precast concrete tiles\nin cement mortar 1:3 including provision of all drainage\narrangements but excluding kerb channel.",
        Quantity: 360.0,
        Units: "sqm",
        "Estimated Rate": 534.0,
        "Total Amount (Rs.)": 192240.0,
      },
      {
        "Serial Number": 14.0,
        "Item Description":
          "Granular Sub-Base with Coarse Graded Material Granular Sub-base with Well Graded Material (CBR>30 or more)(Table:- 400-1 & Table 400-2)Construction of granular sub-base by providing well gradedmaterial like natural sand crushed gravel or crushed stone having CBR >30, spreading in uniform layers with motor graderon prepared surface, mixing by mix in place method with rotavator or plant mix method at OMC, and compacting with vibratory rollers of 80 to 100 kN static weight to achieve the desired  ensity, complete as per Clause 401 of Specification.",
        Quantity: 72528.9,
        Units: "cum",
        "Estimated Rate": 934.0,
        "Total Amount (Rs.)": 67741992.6,
      },
      {
        "Serial Number": 15.0,
        "Item Description":
          "Providing, laying, spreading and compacting graded stone aggregate to wet mix macadam specification including premixing the Material with water at OMC in mechanical mix plant carriage of mixed Material by tipper to site, laying in uniform layers with paver in sub- base / base course on well prepared surface and compacting with vibratory roller to achieve the desired density in accordance to Table No. 400-12, 400-13 and as per clause of section 406 of specifications",
        Quantity: 74913.43,
        Units: "cum",
        "Estimated Rate": 1493.0,
        "Total Amount (Rs.)": 111845750.99,
      },
      {
        "Serial Number": 16.0,
        "Item Description":
          "Providing and applying primer coat with bitumen emulsion on prepared surface of granular Base including clearing of road surface and spraying primer at the rate of 0.75 kg/sqm using mechanical means as per clause 502 of specifications",
        Quantity: 262320.5,
        Units: "sqm",
        "Estimated Rate": 37.0,
        "Total Amount (Rs.)": 9705858.5,
      },
      {
        "Serial Number": 17.0,
        "Item Description":
          "Providing and laying dense bituminous macadam using crushed aggregates of specified grading, premixed with bituminous binder @ 4.0 to 4.5% by weight of total mix of mix and filler,transporting the hot mix to work site, laying with a hydrostatic\npaver finisher with sensor control to the required grade, level and alignment, rolling with smooth wheeled, vibratory and tandem rollers to achieve the desired compaction as per clause 505 of specification complete in all respects.   a) Using Batch Mix Plnt of appropriate capacity and Paver finisher Hydraustatic with Sensor.\n(ii) for Grading I(40 mm nominal size )",
        Quantity: 25378.45,
        Units: "cum",
        "Estimated Rate": 7891.0,
        "Total Amount (Rs.)": 200261348.95000002,
      },
      {
        "Serial Number": 18.0,
        "Item Description":
          "Providing and applying tack coat with catonic bitumen emulsion (RS-1) using emulsion pressure distributor on the prepared bituminous/granular surface cleaned with mechanical broom and as per relevant clauses of section-503 of specifications.",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 18.01,
        "Item Description":
          " (i) @ 0.3 kg per sqm (dry & hungry bituminous surfaces\n/granular surfaces treated )",
        Quantity: 299106.2,
        Units: "sqm",
        "Estimated Rate": 16.0,
        "Total Amount (Rs.)": 4785699.2,
      },
      {
        "Serial Number": 18.02,
        "Item Description":
          "(i) @ 0.25 kg per sqm (normal bituminous surfaces)",
        Quantity: 585987.5,
        Units: "sqm",
        "Estimated Rate": 14.0,
        "Total Amount (Rs.)": 8203825.0,
      },
      {
        "Serial Number": 19.0,
        "Item Description":
          "Bituminous Concrete\nProviding and laying bituminous concrete using crushed aggregates of specified grading, premixed with bituminous binder @ 5.4 to 5.6 % of mix and filler, transporting the hot mix to work site, laying with a hydrostatic paver finisher with sensor control to the required grade, level and alignment, rolling with smooth wheeled, vibratory and tandem rollers to achieve the desired compaction as per clause 507 of specification.\na) Using Batch Mix Plant of appropriate capacity andPaver Finisher Hydraustatic with Sensor control.\n(ii)  for Grading-I ( 50-65 mm thickness ) with 30/40\nbitumen (VG-40)\n",
        Quantity: 29082.69,
        Units: "cum",
        "Estimated Rate": 9895.0,
        "Total Amount (Rs.)": 287773217.55,
      },
      {
        "Serial Number": 23.0,
        "Item Description":
          "Cast in Situ Cement Concrete M20 kerb (Construction of cement concrete kerb with top and bottom width 115 and 165 mm respectively, 250 mm high in M 20 grade PCC on M-10 grade foundation 150 mm thick, foundation having 50 mm projection beyond kerb stone, kerb stone laid with kerb laying machine, foundation concrete laid manually, all complete as per clause 408) \nUsing Concrete Batching and Mixing Plant",
        Quantity: 30585.8,
        Units: "metre",
        "Estimated Rate": 425.0,
        "Total Amount (Rs.)": 12998965.0,
      },
      {
        "Serial Number": 25.0,
        "Item Description":
          "Road Marking with Hot Applied Thermoplastic Compound with Reflectorising Glass Beads on Bituminous Surface\nProviding and laying of hot applied thermoplastic compound 2.5 mm thick including reflectorising glass beads @ 250 gms per sqm area, thickness of 2.5 mm is exclusive of surface applied glass beads as per IRC:35 .The finished surface to be level, uniform and free from streaks and holes all complete as per clause 803 of specifications.",
        Quantity: 13643.0,
        Units: "sqm",
        "Estimated Rate": 636.0,
        "Total Amount (Rs.)": 8676948.0,
      },
      {
        "Serial Number": 29.0,
        "Item Description":
          "Cable Duct Across the Road\nProviding and laying of a reinforced cement concrete pipe duct, 300 mm dia, across the road (new construction), extending from drain to drain in cuts and toe of slope to toe of slope in fills, constructing head walls at both ends, providing a minimum fill of granular material over top and sides of RCC pipe as per IRC:98- 1997, bedded on a 0.3 m thick layer of granular material free of rock pieces, outer to outer distance of  pipe at least half dia of pipe subject to minimum 450 mm in case of double and triple row ducts, joints to be made leak proof, invert level of duct to be above higher than ground level to prevent entry of water and dirt, all as per IRC: 98 - 1997 and approved drawings.",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 29.01,
        "Item Description": "Single Row for one utility service",
        Quantity: 1.0,
        Units: "metre",
        "Estimated Rate": 1786.0,
        "Total Amount (Rs.)": 1786.0,
      },
      {
        "Serial Number": 29.02,
        "Item Description": "Double Row for two utility services",
        Quantity: 1.0,
        Units: "metre",
        "Estimated Rate": 3253.0,
        "Total Amount (Rs.)": 3253.0,
      },
      {
        "Serial Number": 37.0,
        "Item Description":
          "Reinforced Cement Concrete Crash Barrier Provision of an Reinforced cement concrete crash barrier at the edges of the road, approaches to bridge structures and medians, constructed with M-20 grade concrete with HYSD reinforcement conforming to IRC:21 and dowel bars 25 mm dia, 450 mm long at expansion joints filled with pre-moulded asphalt filler board, keyed to the structure on which it is built and installed as per design given in the enclosure to MOST circular No. RW/NH - 33022/1/94-DO III dated 24 June 1994 as per dimensions in the approved drawing and at locations directed by the Engineer, all as specified.\n(i) M 40 grade concrete",
        Quantity: 2012.72,
        Units: "metre",
        "Estimated Rate": 3691.0,
        "Total Amount (Rs.)": 7428949.5200000005,
      },
      {
        "Serial Number": 38.0,
        "Item Description":
          'Type - A, "W" : Metal Beam Crash Barrier (Providing and erecting a "W" metal beam crash barrier comprising of 3 mm thick corrugated sheet metal beam rail, 70 cm above road/ground level, fixed on ISMC series channel vertical post, 150 x 75 x 5 mm spaced 2 m centre to centre, 1.8 m high, 1.1 m below ground/ road level, all steel parts and fitments to be galvanised by hot dip process, all fittings to conform to IS:1367 and IS:1364, metal beam rail to be fixed on the vertical post with a spacer of channel section 150 x 75 x 5 mm, 330 mm long complete as per clause 811)',
        Quantity: 10326.0,
        Units: "metre",
        "Estimated Rate": 4500.0,
        "Total Amount (Rs.)": 46467000.0,
      },
      {
        "Serial Number": 42.0,
        "Item Description":
          "Excavation for Structures Earth work in excavation of foundation of structures as per drawing and technical specification, including setting out, construction of shoring and bracing, removal of stumps and other deleterious matter, dressing of sides and bottom and backfilling with approved material. as per relevant clauses of section 300 & 2100 in \nB Mechanical Means ",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 59.0,
        "Item Description":
          "Reinforced cement concrete approach slab (Grade of concrere M 30) including reinforcement and formwork complete as per drawing and Technical specification and as per relevant clauses of section 1500, 1600, 1700 and clause 2704 of specifications.",
        Quantity: 567.855,
        Units: "Cum",
        "Estimated Rate": 9683.0,
        "Total Amount (Rs.)": 5498539.965,
      },
      {
        "Serial Number": 60.0,
        "Item Description":
          "Strip Seal Expansion Joint Providing and laying of a strip seal expansion joint catering to maximum horizontal movement upto 70 mm, complete as per approved drawings and standard specifications to be installed by the manufacturer/supplier or their authorised representative ensuring compliance to the manufacturer's instructions for installation.",
        Quantity: 653.544508295365,
        Units: "meter",
        "Estimated Rate": 5532.0,
        "Total Amount (Rs.)": 3615408.219889959,
      },
      {
        "Serial Number": 61.0,
        "Item Description":
          "Cement concrete blocks (size 0.5 x 0.5 x 0.5 m) (Providing and laying of apron with cement concrete blocks of size 0.5x0.5x0.5 m cast in-situ and made with nominal mix of M-15 grade cement concrete with a minimum cement content of 250 kg/cum as per IRC: 21-2000.)",
        Quantity: 2465.89,
        Units: "Cum",
        "Estimated Rate": 4947.0,
        "Total Amount (Rs.)": 12198757.83,
      },
      {
        "Serial Number": 62.0,
        "Item Description":
          "Providing and laying Pitching on slopes laid over prepared filter media including boulder apron laid dry in front of toe of embankment complete as per drawing and Technical specifications\nA Stone/Boulder",
        Quantity: 6342.38,
        Units: "Cum",
        "Estimated Rate": 2211.0,
        "Total Amount (Rs.)": 14023002.18,
      },
      {
        "Serial Number": 63.0,
        "Item Description":
          "Providing and laying Filter material underneath pitching in slopes \ncomplete as per drawing and Technical specification",
        Quantity: 4821.94,
        Units: "Cum",
        "Estimated Rate": 750.0,
        "Total Amount (Rs.)": 3616454.9999999995,
      },
      {
        "Serial Number": 64.0,
        "Item Description":
          "Flexible Apron :Construction of flexible apron 1 m thick comprising of loose stone boulders weighing not less than 40 kg beyond curtain wall.",
        Quantity: 4773.2,
        Units: "Cum",
        "Estimated Rate": 2279.0,
        "Total Amount (Rs.)": 10878122.799999999,
      },
    ],
    "Roadside furniture": [
      {
        "Serial Number": 24.0,
        "Item Description":
          "Retro- reflectorised Traffic signs\nProviding and fixing of retro-reflectorised cautionary, mandatory and informatory sign board as per IRC 67-2010 made of high intensity Micro-Prismatic Grade Sheeting (Type XI) vide clause 801.3.3 fixed over Aluminium composite material sheet with thermoplastic core of Low density polyethylene (LDPE) between two thick skins/ sheets of aluminium with overall thickness of 4mm and aluminium skin of thickness 0.3 on both side, the ACM shall conform to Table 800-1 of specification and High Intensity Micro Prismatck Grade Sheeting shall conform to Table 800-3 of specification. The printing on the high intensity grade sheeting shall conform to Clause 801.3.7 with water based latex optimized transparent ink as specified by the sheeting manufacturer, supported on a mild steel angle iron post 75 mm x 75 mm x 6 mm firmly fixed to ground by means of properly designed foundation with M15 grade concrete 450x450x600mm The ACM sheet shall be fixed to the post with four minimum four number breakaway bolts.",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 24.01,
        "Item Description":
          "90 cm equilateral triangle Cautionary/Warning Sign",
        Quantity: 124.0,
        Units: "each",
        "Estimated Rate": 4184.0,
        "Total Amount (Rs.)": 518816.0,
      },
      {
        "Serial Number": 24.02,
        "Item Description":
          "60 cm equilateral triangle Cautionary/Warning Sign",
        Quantity: 26.0,
        Units: "each",
        "Estimated Rate": 3011.0,
        "Total Amount (Rs.)": 78286.0,
      },
      {
        "Serial Number": 24.03,
        "Item Description": "60 cm circular 'Mandatory/Regulatory Signs",
        Quantity: 50.0,
        Units: "each",
        "Estimated Rate": 3779.0,
        "Total Amount (Rs.)": 188950.0,
      },
      {
        "Serial Number": 24.04,
        "Item Description": "80 cm x 60 cm rectangular Informatory Signs",
        Quantity: 74.0,
        Units: "each",
        "Estimated Rate": 4971.0,
        "Total Amount (Rs.)": 367854.0,
      },
      {
        "Serial Number": 24.05,
        "Item Description":
          "60 cm x 45 cm rectangular Informatory Signs/Cheveron Sign",
        Quantity: 48.0,
        Units: "each",
        "Estimated Rate": 3700.0,
        "Total Amount (Rs.)": 177600.0,
      },
      {
        "Serial Number": 24.06,
        "Item Description": "60 cm x 60 cm square Informatory Signs",
        Quantity: 12.0,
        Units: "each",
        "Estimated Rate": 4245.0,
        "Total Amount (Rs.)": 50940.0,
      },
      {
        "Serial Number": 24.07,
        "Item Description": "90 cm high octagon Stop Signs",
        Quantity: 12.0,
        Units: "each",
        "Estimated Rate": 6132.0,
        "Total Amount (Rs.)": 73584.0,
      },
      {
        "Serial Number": 26.0,
        "Item Description":
          "Kilo Metre Stone (Reinforced cement concrete M15grade kilometre stone of standard design as per IRC:8-1980, fixing in position including painting and printing etc)",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 26.01,
        "Item Description": "(i) 5th kilometre stone (precast)",
        Quantity: 14.0,
        Units: "each",
        "Estimated Rate": 3275.0,
        "Total Amount (Rs.)": 45850.0,
      },
      {
        "Serial Number": 26.02,
        "Item Description": "(ii) Ordinary Kilometer stone (Precast)",
        Quantity: 54.0,
        Units: "each",
        "Estimated Rate": 1984.0,
        "Total Amount (Rs.)": 107136.0,
      },
      {
        "Serial Number": 26.03,
        "Item Description": "(iii) Hectometer stone (Precast)",
        Quantity: 272.0,
        Units: "each",
        "Estimated Rate": 578.0,
        "Total Amount (Rs.)": 157216.0,
      },
      {
        "Serial Number": 26.04,
        "Item Description": "(iv) Boundary Stone",
        Quantity: 340.0,
        Units: "each",
        "Estimated Rate": 546.0,
        "Total Amount (Rs.)": 185640.0,
      },
      {
        "Serial Number": 27.0,
        "Item Description":
          "Road Delineators\nSupplying and installation road delineators (road way indicators). as per MORT&H Clause 806. The structure shall be made in roll forming process having height of 80-100 cm above the ground level, width not less than 100 mm and shall extend not more than 300mm below the ground while being installed, buried or pressed in to the ground in confirmation with IRC:79: 1981, are as directed by the by. the Engineer painted black with powder coat of minimum 40 microns thickness for protection against corrosion, on top of which Type XI retro reflective sheeting shall be pasted on both sides complying to IRC:79:1981. The delineator should consist of minimum retro reflective unit exposed area of 330 cm2 white color, full cube corner micro prismatic non-metallic retro reflective sheeting on each side conforming with IRC 67:2012 and meeting the coefficient of retro reflection values as per ASTM D 4956 Type XI label specification. The delineator shall have grooves across the length to make the reflective sheets vandal- proof.",
        Quantity: 1062.0,
        Units: "each",
        "Estimated Rate": 990.0,
        "Total Amount (Rs.)": 1051380.0,
      },
      {
        "Serial Number": 28.0,
        "Item Description":
          "Road Markers/Road Stud with Lense Reflector\nProviding and fixing of road stud 100x 100 mm, die cast in aluminium, resistant to corrosive effect of salt and grit, fitted with lense reflectors, installed in concrete or asphaltic surface by drilling hole 30 mm upto a depth of 60 mm and bedded in a\nsuitable bituminous grout or epoxy mortar, all as per BS 873 part 4:1973",
        Quantity: 4797.0,
        Units: "each",
        "Estimated Rate": 673.0,
        "Total Amount (Rs.)": 3228381.0,
      },
      {
        "Serial Number": 30.0,
        "Item Description":
          "Providing and fixing guard stones 220x220x1000mm made of hammer dressed stones and fixed 400mm into the ground in moorum and broken aggregates block of size 500x500x500 mm and given two coats of paints with white and black bands i/c excavation etc. complete.",
        Quantity: 136.0,
        Units: "each",
        "Estimated Rate": 368.0,
        "Total Amount (Rs.)": 50048.0,
      },
      {
        "Serial Number": 33.0,
        "Item Description":
          "Overhead Gantry Sign High intensity mirco-prismatic type sheeting (hip) type- iv overhead sign board type - iii for both side message board, span 16 mtr.(13.5 x 1.5 sq.mtr. Sheeting) with complete erection work.",
        Quantity: 5.0,
        Units: "MT",
        "Estimated Rate": 200000.0,
        "Total Amount (Rs.)": 1000000.0,
      },
      {
        "Serial Number": 34.0,
        "Item Description": "Cantilever type overhead sign",
        Quantity: 67.2,
        Units: "Sqm",
        "Estimated Rate": 82357.0,
        "Total Amount (Rs.)": 5534390.4,
      },
      {
        "Serial Number": 35.0,
        "Item Description":
          "Design, Fabricate, supply and installation of 10m height single arm light pole for 1km at 25m interval with its accessories on suitable RCC foundation including base plate, nuts, bolts etc. complete as per Section-10 & Section-12 of IRC:SP-84.",
        Quantity: 199.0,
        Units: "each",
        "Estimated Rate": 75000.0,
        "Total Amount (Rs.)": 14925000.0,
      },
      {
        "Serial Number": 36.0,
        "Item Description":
          "Design, Fabricate, supply and installation of 10m height Double arm light pole for 1km at 25m interval with its accessories on suitable RCC foundation including base plate, nuts, bolts etc. complete as per Section-10 & Section-12 of IRC:SP-84.",
        Quantity: 317.66,
        Units: "each",
        "Estimated Rate": 100000.0,
        "Total Amount (Rs.)": 31766000.000000004,
      },
      {
        "Serial Number": 39.0,
        "Item Description":
          "Planting of Trees and their Maintenance for one Year  (Planting of trees by the road side (Avenue trees) in 0.60 m dia holes,  1 m deep dug in the ground,  mixing the soil with decayed farm yard/sludge mannure,  planting the saplings,  backfilling the trench,  watering,  fixing the tree guard and maintaining the plants for one year)",
        Quantity: 29894.0,
        Units: "each",
        "Estimated Rate": 779.0,
        "Total Amount (Rs.)": 23287426.0,
      },
      {
        "Serial Number": 40.0,
        "Item Description":
          "Planting of low height flowering Plants and Shrubs in one rows in central median as per clause 11.2.4 of IRC:SP-84.",
        Quantity: 18480.83,
        Units: "each",
        "Estimated Rate": 100.0,
        "Total Amount (Rs.)": 1848083.0000000002,
      },
      {
        "Serial Number": 41.0,
        "Item Description": "Rain Water Harvesting at the interval of 500m",
        Quantity: 68.0,
        Units: "each",
        "Estimated Rate": 100000.0,
        "Total Amount (Rs.)": 6800000.0,
      },
      {
        "Serial Number": 56.0,
        "Item Description":
          "Construction of RCC railing of M30 Grade in-situ with 20 mm nominal size aggregate, true to line and grade, tolurence of vertical RCC post not to exceed 1 in 500, centre to centre spacing between vertical post not to exceed 2000 mm, leaving adequate space between vertical post for expansion, complete as per approved drawings and technical specifications and as per relevant clauses of sections 1500, 1600, 1700 and clause 2703 of specifications (as per MoST specification drawing SD/201 or SD/304)",
        Quantity: 1267.68,
        Units: "meter",
        "Estimated Rate": 2064.0,
        "Total Amount (Rs.)": 2616491.52,
      },
      {
        "Serial Number": 57.0,
        "Item Description":
          "Drainage Spouts complete as per drawing and Technical specification and as per clause 2705 of specifications.",
        Quantity: 110.0,
        Units: "each",
        "Estimated Rate": 1311.0,
        "Total Amount (Rs.)": 144210.0,
      },
      {
        "Serial Number": 65.0,
        "Item Description":
          "Providing and fixing  Liter bin complete as per Techical Specification.",
        Quantity: 13.0,
        Units: "Nos.",
        "Estimated Rate": 35000.0,
        "Total Amount (Rs.)": 455000.0,
      },
      {
        "Serial Number": 66.0,
        "Item Description":
          "Providing shelter for Bus Passanger as per Drawing and techical specification 1500,1600,1700.",
        Quantity: 12.0,
        Units: "Nos.",
        "Estimated Rate": 125000.0,
        "Total Amount (Rs.)": 1500000.0,
      },
      {
        "Serial Number": 67.0,
        "Item Description":
          "Providing and fixing Litter bins complete as per Technical Specifications.",
        Quantity: 10.0,
        Units: "Nos.",
        "Estimated Rate": 5000.0,
        "Total Amount (Rs.)": 50000.0,
      },
      {
        "Serial Number": 68.0,
        "Item Description": "Rest areas with toilets, drinking water ",
        Quantity: 6.0,
        Units: "Nos.",
        "Estimated Rate": 250000.0,
        "Total Amount (Rs.)": 1500000.0,
      },
    ],
    "Structures Work": [
      {
        "Serial Number": 2.0,
        "Item Description":
          "Dismantling of Structures Dismantling of existing structures like culverts, bridges, retaining walls and other structure comprising of masonry, cement concrete, wood work, steel work, including T&P and scaffolding wherever necessary, sorting the dismantled material, disposal of unserviceable material and stacking the serviceable material with all lifts and lead of 1000 metres.  (i) Lime /Cement Concrete",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 2.01,
        "Item Description":
          "C Prestressed / Reinforced cement concrete grade M-25& \nabove",
        Quantity: 895.32,
        Units: "cum",
        "Estimated Rate": 1170.0,
        "Total Amount (Rs.)": 1047524.4,
      },
      {
        "Serial Number": 20.0,
        "Item Description":
          "Reinforced earth retaining walls have four main components as under: a) Excavation for foundation, foundation concrete and cement concrete grooved seating in the foundation for facing elements (facia material). b)  Facia material and its placement.  c) Assembling, joining with facing elements and laying of the reinforcing elements. d) Earthfill with granular material which is to be retained by the wall. (Back filling behind the facing element shall be paid separately as per Chapter 3.12) \n(iii) Facing elements of RCC \na . RCC Panel ",
        Quantity: 29000.0,
        Units: "Sqm",
        "Estimated Rate": 665.0,
        "Total Amount (Rs.)": 19285000.0,
      },
      {
        "Serial Number": 21.0,
        "Item Description":
          "Reinforced cement concrete crash barrier with frication slab Provision of an Reinforced cement concrete crash barrier with frication slab at the approaches to bridge structures, constructed with M-40 grade concrete with HYSD reinforcement conforming to IRC:112 and as per dimensions in the approved drawing and at locations directed by the Engineer, all as specified. (Area-0.185 Sqm, /Meter) below frication slab and (Area-1.03 Sqm, /Meter)Crash Barrier with frication slab Unit= Linear meter",
        Quantity: 3326.0,
        Units: "Rmt",
        "Estimated Rate": 15171.0,
        "Total Amount (Rs.)": 50458746.0,
      },
      {
        "Serial Number": 22.0,
        "Item Description":
          "Supplying and laying drainage composite for use behind walls, between two different fills, alongside and below drains of road, etc having drainage core of HDPE/polypropylene type, thermally bonded with non-woven geotextile on both side of maximum apparent opening size 150 micron & permeability of 70 lit/m2 sec. Geocomposite drain having in plane flow capacity of 1.5 lit/m sec. at hydraulic gradient  of 1.0 & 100kPa pressure as per ASTM D 4716 and tensile strength of 20kN/m as per ASTM D4595.Geocomposite drain having creep factor less than equal to 1.3 as per ASTM D 7931,with all leads and lifts, manpower, machinery, materials, labour etc. complete and as  directed by Engineer-In-Charge.",
        Quantity: 27337.0,
        Units: "cum",
        "Estimated Rate": 616.0,
        "Total Amount (Rs.)": 16839592.0,
      },
      {
        "Serial Number": 31.0,
        "Item Description":
          "Tubular Steel Railing on Medium Weight steel channel ( ISMC series) 100 mm x 50 mm (Providing, fixing and erecting 50 mm dia steel pipe railing in 3 rows duly painted on medium weight steel channels (ISMC series) 100 mm x 50 mm, 1.2 metres high above ground, 2 m centre to centre, complete as per approved drawings)",
        Quantity: 1.0,
        Units: "METER",
        "Estimated Rate": 2001.0,
        "Total Amount (Rs.)": 2001.0,
      },
      {
        "Serial Number": 32.0,
        "Item Description":
          "Providing Pedestrian Guard Rails and safety barriers as per clause 9.10 of IRC SP-84 & IRC 103\nTubular Steel Railing on Precast RCC posts, 1.2 m high above\nground level\nProviding, fencing and erecting 50 mm dia (weighing 3.56 kg per\nmts.) painted steel pipe railing in 3 rows on precast M20 grade\nRCC vertical posts1.8 metres high (1.2 m above GL) with 3 holes\n50 mm dia for pipe, fixed 2 metres centre to, complete as per\napproved drawing.",
        Quantity: 8181.0,
        Units: "METER",
        "Estimated Rate": 1431.0,
        "Total Amount (Rs.)": 11707011.0,
      },
      {
        "Serial Number": 42.01,
        "Item Description": "i) Depth upto 3 m",
        Quantity: 62109.1158497725,
        Units: "Cum",
        "Estimated Rate": 61.0,
        "Total Amount (Rs.)": 3788656.0668361224,
      },
      {
        "Serial Number": 42.02,
        "Item Description": "ii) Depth 3 m to 6 m",
        Quantity: 1218.65,
        Units: "Cum",
        "Estimated Rate": 70.0,
        "Total Amount (Rs.)": 85305.5,
      },
      {
        "Serial Number": 42.03,
        "Item Description": "iiI) Above 6 Meter",
        Quantity: 531.591199999996,
        Units: "Cum",
        "Estimated Rate": 86.0,
        "Total Amount (Rs.)": 45716.843199999654,
      },
      {
        "Serial Number": 43.0,
        "Item Description":
          "Providing Plain cement concrete M-15 nominal mix in \nfoundation as per relevant clauses of sections 1500, 1700 and \n2100",
        Quantity: 7545.79,
        Units: "Cum",
        "Estimated Rate": 4349.0,
        "Total Amount (Rs.)": 32816640.71,
      },
      {
        "Serial Number": 44.0,
        "Item Description":
          "Supplying, fitting and placing un-coated HYSD bar reinforcement in foundation complete as per drawing and technical specifications and as per relevant clauses of section 1600",
        Quantity: 938.71,
        Units: "MT",
        "Estimated Rate": 81349.0,
        "Total Amount (Rs.)": 76363119.79,
      },
      {
        "Serial Number": 45.0,
        "Item Description":
          "Provdiing and laying Plain/Reinforced cement concrete in open foundation including form work shuttering etc. complete as per drawing and technical specifications and as per relevant clauses of sections 1500, 1700 & 2100 with .",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 45.01,
        "Item Description": " PCC Grade M15",
        Quantity: 601.7,
        Units: "Cum",
        "Estimated Rate": 4617.0,
        "Total Amount (Rs.)": 2778048.9000000004,
      },
      {
        "Serial Number": 45.02,
        "Item Description": " PCC Grade M20",
        Quantity: 8323.13,
        Units: "Cum",
        "Estimated Rate": 5162.0,
        "Total Amount (Rs.)": 42963997.059999995,
      },
      {
        "Serial Number": 45.03,
        "Item Description": " RCC Grade M25 ",
        Quantity: 8070.29,
        Units: "Cum",
        "Estimated Rate": 5369.0,
        "Total Amount (Rs.)": 43329387.01,
      },
      {
        "Serial Number": 45.04,
        "Item Description": " RCC Grade M30",
        Quantity: 1021.24,
        Units: "Cum",
        "Estimated Rate": 5419.0,
        "Total Amount (Rs.)": 5534099.56,
      },
      {
        "Serial Number": 45.05,
        "Item Description": " RCC Grade M35 ",
        Quantity: 3437.38,
        Units: "Cum",
        "Estimated Rate": 5492.0,
        "Total Amount (Rs.)": 18878090.96,
      },
      {
        "Serial Number": 46.0,
        "Item Description":
          "Plain/Reinforced cement concrete in sub-structure complete as \nper drawing and technical specifications",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 46.01,
        "Item Description": " PCC Grade M20",
        Quantity: 464.12866,
        Units: "Cum",
        "Estimated Rate": 5727.0,
        "Total Amount (Rs.)": 2658064.83582,
      },
      {
        "Serial Number": 46.02,
        "Item Description": " RCC Grade M35",
        Quantity: 3102.0,
        Units: "Cum",
        "Estimated Rate": 6418.0,
        "Total Amount (Rs.)": 19908636.0,
      },
      {
        "Serial Number": 46.03,
        "Item Description": " RCC Grade M40",
        Quantity: 18.34,
        Units: "Cum",
        "Estimated Rate": 6668.0,
        "Total Amount (Rs.)": 122291.12,
      },
      {
        "Serial Number": 47.0,
        "Item Description":
          "Supplying, fitting and placing HYSD bar reinforcement in sub\u0002structure complete as per drawing and technical specifications and as per relevant clause of section 1600.",
        Quantity: 343.649918767473,
        Units: "MT.",
        "Estimated Rate": 81530.0,
        "Total Amount (Rs.)": 28017777.877112076,
      },
      {
        "Serial Number": 48.0,
        "Item Description":
          "Providing weep holes in Brick masonry/Plain/Reinforced concrete abutment, wing wall/return wall with 100 mm dia AC/PVC pipe, extending through the full width of the structure with slope of              1V :20H towards drawing foce. Complete as per drawing and Technical specifications",
        Quantity: 11361.19,
        Units: "Meter",
        "Estimated Rate": 185.0,
        "Total Amount (Rs.)": 2101820.15,
      },
      {
        "Serial Number": 49.0,
        "Item Description":
          " Back filling behind abutment, wing wall and return wall \ncomplete as per drawing and Technical specification and as per \nrelevant clauses 305 of specifications and as per appendix 6 of \nIRC-78 A Granular material",
        Quantity: 1923.5,
        Units: "Cum",
        "Estimated Rate": 665.0,
        "Total Amount (Rs.)": 1279127.5,
      },
      {
        "Serial Number": 50.0,
        "Item Description":
          "Providing and laying of Filter media with granular materials/stone crushed aggregates satisfying the requirements laid down in clause 2504.2.2 of MoRTH specifications to a thickness of not less than 600 mm with smaller size towards the soil and bigger size towards the wall and provided over the entire surface behind abutment, wing wall and return wall to the full height compacted to a firm condition complete as per drawing and technical specification.",
        Quantity: 1284.915,
        Units: "Cum",
        "Estimated Rate": 750.0,
        "Total Amount (Rs.)": 963686.25,
      },
      {
        "Serial Number": 51.0,
        "Item Description":
          "Supplying, fitting and fixing in position true to line and level elastomeric bearing conforming to IRC: 83 (Part-II) section IX and clause 2005 of MoRTH specifications complete including all accessories as per drawing and Technical Specifications",
        Quantity: 2072800.0,
        Units: "Cum",
        "Estimated Rate": 0.86,
        "Total Amount (Rs.)": 1782608.0,
      },
      {
        "Serial Number": 52.0,
        "Item Description":
          "Furnishing and Placing Reinforced/Prestressed cement concrete in super-structure as per drawing and Technical Specification and as per relevant clauses of sections 1500, 1700 and 2300 in",
        Quantity: null,
        Units: "",
        "Estimated Rate": null,
        "Total Amount (Rs.)": null,
      },
      {
        "Serial Number": 52.01,
        "Item Description": "RCC &  PSC Grade M-35",
        Quantity: 4417.0,
        Units: "Cum",
        "Estimated Rate": 6416.0,
        "Total Amount (Rs.)": 28339472.0,
      },
      {
        "Serial Number": 52.02,
        "Item Description": "RCC &  PSC Grade M-40  I Beam , i/c launching ",
        Quantity: 136.3,
        Units: "Cum",
        "Estimated Rate": 9461.0,
        "Total Amount (Rs.)": 1289534.3,
      },
      {
        "Serial Number": 52.03,
        "Item Description": "RCC &  PSC Grade M-45",
        Quantity: 300.73,
        Units: "Cum",
        "Estimated Rate": 7339.0,
        "Total Amount (Rs.)": 2207057.47,
      },
      {
        "Serial Number": 53.0,
        "Item Description":
          "Supplying, fitting and placing HYSD bar reinforcement in super structure complete as per drawing and technical specifications as per relevant clauses of section 1600 ",
        Quantity: 844.66,
        Units: "MT",
        "Estimated Rate": 82810.0,
        "Total Amount (Rs.)": 69946294.6,
      },
      {
        "Serial Number": 54.0,
        "Item Description":
          "High tensile steel wires/strands including all accessories for stressing,stressing operations and grouting complete as per drawing and Technical Specifications and as per relevant clauses of section 1800.",
        Quantity: 75.45,
        Units: "MT",
        "Estimated Rate": 112185.0,
        "Total Amount (Rs.)": 8464358.25,
      },
      {
        "Serial Number": 55.0,
        "Item Description":
          "Providing and laying Cement concrete wearing coat M-30 grade including reinforcement complete as per drawing and Technical Specifications and as per relevant clauses of sections 1500, 1700 and Clause 2702 of specifications..",
        Quantity: 976.26,
        Units: "Cum",
        "Estimated Rate": 11685.0,
        "Total Amount (Rs.)": 11407598.1,
      },
      {
        "Serial Number": 58.0,
        "Item Description":
          "PCC M15 Grade leveling course below approach slab complete as per drawing and Technical specification and as per relevant clauses of section 1700",
        Quantity: 275.145,
        Units: "Cum",
        "Estimated Rate": 4664.0,
        "Total Amount (Rs.)": 1283276.28,
      },
    ],
  };

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
              Item-Rate Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score */}
          <BioAndScore tenderData={tenderData} />

          {/* Current Site Information */}
          <CurrentSite tenderData={tenderData} />

          {/* Location Insights Panel */}
          <LocationInsights tenderData={tenderData} />

          {/* Nature of Work Section */}
          {!Object.values(workCategories).every(isObjEmpty) && (
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Nature of Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="road-works">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 mb-6 bg-gray-100 rounded-xl p-1">
                    <TabsTrigger
                      value="road-works"
                      className="rounded-lg text-xs"
                    >
                      Road Works
                    </TabsTrigger>
                    <TabsTrigger
                      value="structures-work"
                      className="rounded-lg text-xs"
                    >
                      Structures Work
                    </TabsTrigger>

                    <TabsTrigger
                      value="roadside-furniture"
                      className="rounded-lg text-xs"
                    >
                      Roadside Furniture
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(workCategories).map(([category, content]) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="mt-0"
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <ScrollArea className="h-96 p-6">
                          <MarkdownRenderer
                            content={content.replace(/\\n/g, "\n")}
                          />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* BOQ Section (instead of Payment Weightage) */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Bill of Quantities (BOQ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl ">
                <ScrollArea className="h-auto p-0">
                  <BOQRenderer categories={categories} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Analysis Section */}
          <CompatibilityAnalysis tenderData={tenderData} />

          {/* Site Images Gallery */}
          <SiteImages tenderData={tenderData} />
        </div>
      </div>
    </div>
  );
};

export default ItemRateAnalysis;
