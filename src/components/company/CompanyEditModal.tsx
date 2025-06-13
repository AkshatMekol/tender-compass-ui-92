
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanyData {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  regionalOffices: string[];
  previousSites: string[];
  currentSites: string[];
  workTypes: string[];
  description: string;
  preferredAuthorities: string[];
  tenderAmountRange: { lower: number; upper: number };
  minorBridges: { comfortable: boolean; maxSpan: number };
  majorBridges: { comfortable: boolean; maxSpan: number };
  bridgeWorkIntensity: string;
}

interface CompanyEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  companyData: CompanyData;
  onSave: (data: CompanyData) => void;
}

const CompanyEditModal: React.FC<CompanyEditModalProps> = ({
  isOpen,
  onOpenChange,
  companyData,
  onSave
}) => {
  const [editData, setEditData] = useState(companyData);
  const { toast } = useToast();

  const workTypeOptions = ['Item-rate', 'EPC', 'HAM', 'BOT', 'Others'];
  const authorityOptions = ['BRO', 'NHAI', 'NHIDCL', 'State PWDs', 'Municipal Corporations', 'Others'];

  const handleSave = () => {
    onSave(editData);
    onOpenChange(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });
  };

  const addEntry = (field: 'regionalOffices' | 'previousSites' | 'currentSites') => {
    setEditData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeEntry = (field: 'regionalOffices' | 'previousSites' | 'currentSites', index: number) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateEntry = (field: 'regionalOffices' | 'previousSites' | 'currentSites', index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const toggleWorkType = (workType: string) => {
    setEditData(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(workType)
        ? prev.workTypes.filter(w => w !== workType)
        : [...prev.workTypes, workType]
    }));
  };

  const toggleAuthority = (authority: string) => {
    setEditData(prev => ({
      ...prev,
      preferredAuthorities: prev.preferredAuthorities.includes(authority)
        ? prev.preferredAuthorities.filter(a => a !== authority)
        : [...prev.preferredAuthorities, authority]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
              <Input
                value={editData.contactPerson}
                onChange={(e) => setEditData({...editData, contactPerson: e.target.value})}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <Input
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Addresses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Headquarters Address</label>
            <Textarea
              value={editData.address}
              onChange={(e) => setEditData({...editData, address: e.target.value})}
              className="rounded-lg"
              rows={2}
            />
          </div>

          {/* Regional Offices */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Regional Offices</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addEntry('regionalOffices')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Office
              </Button>
            </div>
            {editData.regionalOffices.map((office, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={office}
                  onChange={(e) => updateEntry('regionalOffices', index, e.target.value)}
                  placeholder="Regional office address"
                  className="rounded-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEntry('regionalOffices', index)}
                  className="rounded-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Previous Sites */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Previous Sites</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addEntry('previousSites')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Site
              </Button>
            </div>
            {editData.previousSites.map((site, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={site}
                  onChange={(e) => updateEntry('previousSites', index, e.target.value)}
                  placeholder="Previous site details"
                  className="rounded-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEntry('previousSites', index)}
                  className="rounded-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Current Sites */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Current Sites</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addEntry('currentSites')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Site
              </Button>
            </div>
            {editData.currentSites.map((site, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={site}
                  onChange={(e) => updateEntry('currentSites', index, e.target.value)}
                  placeholder="Current site details"
                  className="rounded-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEntry('currentSites', index)}
                  className="rounded-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Work Types Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Types</label>
            <div className="flex flex-wrap gap-2">
              {workTypeOptions.map((workType) => (
                <div
                  key={workType}
                  onClick={() => toggleWorkType(workType)}
                  className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                    editData.workTypes.includes(workType)
                      ? 'bg-teal-100 border-teal-500 text-teal-800'
                      : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {workType}
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Authorities Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Authorities</label>
            <div className="flex flex-wrap gap-2">
              {authorityOptions.map((authority) => (
                <div
                  key={authority}
                  onClick={() => toggleAuthority(authority)}
                  className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                    editData.preferredAuthorities.includes(authority)
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {authority}
                </div>
              ))}
            </div>
          </div>

          {/* Tender Amount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tender Amount Range</label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Lower Limit (₹ Cr)</label>
                <Input
                  type="number"
                  value={editData.tenderAmountRange.lower}
                  onChange={(e) => setEditData({
                    ...editData,
                    tenderAmountRange: { ...editData.tenderAmountRange, lower: Number(e.target.value) }
                  })}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Upper Limit (₹ Cr)</label>
                <Input
                  type="number"
                  value={editData.tenderAmountRange.upper}
                  onChange={(e) => setEditData({
                    ...editData,
                    tenderAmountRange: { ...editData.tenderAmountRange, upper: Number(e.target.value) }
                  })}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Slider
                value={[editData.tenderAmountRange.lower, editData.tenderAmountRange.upper]}
                onValueChange={([lower, upper]) => setEditData({
                  ...editData,
                  tenderAmountRange: { lower, upper }
                })}
                min={10}
                max={2000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹10 Cr</span>
                <span>₹2000 Cr</span>
              </div>
            </div>
          </div>

          {/* Bridge Works */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Bridge Works</h3>
            
            {/* Minor Bridges */}
            <div className="space-y-3">
              <h4 className="text-md font-medium text-gray-700">Minor Bridges</h4>
              <div className="flex items-center space-x-3">
                <Label htmlFor="minor-comfortable">Comfortable?</Label>
                <Switch
                  id="minor-comfortable"
                  checked={editData.minorBridges.comfortable}
                  onCheckedChange={(checked) => setEditData({
                    ...editData,
                    minorBridges: { ...editData.minorBridges, comfortable: checked }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Span: {editData.minorBridges.maxSpan}m</Label>
                <Slider
                  value={[editData.minorBridges.maxSpan]}
                  onValueChange={([value]) => setEditData({
                    ...editData,
                    minorBridges: { ...editData.minorBridges, maxSpan: value }
                  })}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0m</span>
                  <span>50m</span>
                </div>
              </div>
            </div>

            {/* Major Bridges */}
            <div className="space-y-3">
              <h4 className="text-md font-medium text-gray-700">Major Bridges</h4>
              <div className="flex items-center space-x-3">
                <Label htmlFor="major-comfortable">Comfortable?</Label>
                <Switch
                  id="major-comfortable"
                  checked={editData.majorBridges.comfortable}
                  onCheckedChange={(checked) => setEditData({
                    ...editData,
                    majorBridges: { ...editData.majorBridges, comfortable: checked }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Span: {editData.majorBridges.maxSpan}m</Label>
                <Slider
                  value={[editData.majorBridges.maxSpan]}
                  onValueChange={([value]) => setEditData({
                    ...editData,
                    majorBridges: { ...editData.majorBridges, maxSpan: value }
                  })}
                  min={0}
                  max={300}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0m</span>
                  <span>300m</span>
                </div>
              </div>
            </div>

            {/* Bridge Work Intensity */}
            <div className="space-y-3">
              <Label>Preferred Bridge-Work Intensity</Label>
              <RadioGroup
                value={editData.bridgeWorkIntensity}
                onValueChange={(value) => setEditData({...editData, bridgeWorkIntensity: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="rounded-lg"
              rows={4}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyEditModal;
