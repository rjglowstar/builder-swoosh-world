import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Clock,
  Moon,
  Sun,
  Calendar,
  Save,
  Plus,
  Edit,
  Trash2,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Schedule {
  id: string;
  name: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  days: boolean[];
  notifyBeforeActivation: boolean;
  createdAt: Date;
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(
    null,
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    enabled: true,
    startTime: "22:00",
    endTime: "07:00",
    days: [true, true, true, true, true, false, false],
    notifyBeforeActivation: false,
  });

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Load schedules from localStorage
  useEffect(() => {
    const savedSchedules = localStorage.getItem("protectionSchedules");
    if (savedSchedules) {
      const parsed = JSON.parse(savedSchedules);
      setSchedules(
        parsed.map((s: any) => ({ ...s, createdAt: new Date(s.createdAt) })),
      );
    } else {
      // Create default schedule if none exist
      const defaultSchedule: Schedule = {
        id: "default",
        name: "Night Protection",
        enabled: false,
        startTime: "22:00",
        endTime: "07:00",
        days: [true, true, true, true, true, false, false],
        notifyBeforeActivation: false,
        createdAt: new Date(),
      };
      setSchedules([defaultSchedule]);
    }
  }, []);

  // Save schedules to localStorage
  const saveSchedules = (newSchedules: Schedule[]) => {
    setSchedules(newSchedules);
    localStorage.setItem("protectionSchedules", JSON.stringify(newSchedules));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      enabled: true,
      startTime: "22:00",
      endTime: "07:00",
      days: [true, true, true, true, true, false, false],
      notifyBeforeActivation: false,
    });
  };

  const handleAddSchedule = () => {
    if (!formData.name.trim()) return;

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      name: formData.name,
      enabled: formData.enabled,
      startTime: formData.startTime,
      endTime: formData.endTime,
      days: [...formData.days],
      notifyBeforeActivation: formData.notifyBeforeActivation,
      createdAt: new Date(),
    };

    saveSchedules([...schedules, newSchedule]);
    resetForm();
    setShowAddDialog(false);
  };

  const handleEditSchedule = () => {
    if (!editingSchedule || !formData.name.trim()) return;

    const updatedSchedules = schedules.map((s) =>
      s.id === editingSchedule.id
        ? {
            ...s,
            name: formData.name,
            enabled: formData.enabled,
            startTime: formData.startTime,
            endTime: formData.endTime,
            days: [...formData.days],
            notifyBeforeActivation: formData.notifyBeforeActivation,
          }
        : s,
    );

    saveSchedules(updatedSchedules);
    setEditingSchedule(null);
    resetForm();
  };

  const handleDeleteSchedule = () => {
    if (!scheduleToDelete) return;

    const updatedSchedules = schedules.filter(
      (s) => s.id !== scheduleToDelete.id,
    );
    saveSchedules(updatedSchedules);
    setScheduleToDelete(null);
  };

  const toggleScheduleEnabled = (id: string) => {
    const updatedSchedules = schedules.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s,
    );
    saveSchedules(updatedSchedules);
  };

  const toggleDay = (index: number) => {
    const newDays = [...formData.days];
    newDays[index] = !newDays[index];
    setFormData({ ...formData, days: newDays });
  };

  const openEditDialog = (schedule: Schedule) => {
    setFormData({
      name: schedule.name,
      enabled: schedule.enabled,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      days: [...schedule.days],
      notifyBeforeActivation: schedule.notifyBeforeActivation,
    });
    setEditingSchedule(schedule);
  };

  const formatScheduleDays = (days: boolean[]) => {
    const selectedDays = days
      .map((selected, index) => (selected ? dayNames[index] : null))
      .filter(Boolean);

    if (selectedDays.length === 7) return "Every day";
    if (selectedDays.length === 5 && days.slice(0, 5).every(Boolean))
      return "Weekdays";
    if (selectedDays.length === 2 && days[5] && days[6]) return "Weekends";
    if (selectedDays.length === 0) return "No days selected";

    return selectedDays.join(", ");
  };

  const getActiveSchedulesCount = () =>
    schedules.filter((s) => s.enabled).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">
                Protection Schedules
              </h1>
            </div>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
              </DialogHeader>
              <ScheduleForm
                formData={formData}
                setFormData={setFormData}
                onSave={handleAddSchedule}
                onCancel={() => setShowAddDialog(false)}
                days={days}
                dayNames={dayNames}
                toggleDay={toggleDay}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Summary Card */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {schedules.length} Schedule
                    {schedules.length !== 1 ? "s" : ""} Total
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getActiveSchedulesCount()} active •{" "}
                    {schedules.length - getActiveSchedulesCount()} inactive
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              className={`transition-all duration-200 ${
                schedule.enabled
                  ? "bg-success/10 border-success/20"
                  : "bg-white/60 border-white/20"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        schedule.enabled ? "bg-success/20" : "bg-muted/20"
                      }`}
                    >
                      {schedule.enabled ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          schedule.enabled ? "text-success" : "text-foreground"
                        }`}
                      >
                        {schedule.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          schedule.enabled
                            ? "text-success/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={schedule.enabled}
                    onCheckedChange={() => toggleScheduleEnabled(schedule.id)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Days:</span>
                    <span className="text-foreground font-medium">
                      {formatScheduleDays(schedule.days)}
                    </span>
                  </div>

                  {schedule.notifyBeforeActivation && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Notifications:
                      </span>
                      <span className="text-info font-medium">
                        10 min reminder
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-border/20">
                  <Dialog
                    open={editingSchedule?.id === schedule.id}
                    onOpenChange={(open) => !open && setEditingSchedule(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(schedule)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Schedule</DialogTitle>
                      </DialogHeader>
                      <ScheduleForm
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleEditSchedule}
                        onCancel={() => setEditingSchedule(null)}
                        days={days}
                        dayNames={dayNames}
                        toggleDay={toggleDay}
                        isEditing
                      />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog
                    open={scheduleToDelete?.id === schedule.id}
                    onOpenChange={(open) => !open && setScheduleToDelete(null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setScheduleToDelete(schedule)}
                        className="text-danger hover:text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Schedule</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{schedule.name}"?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteSchedule}
                          className="bg-danger hover:bg-danger/90"
                        >
                          Delete Schedule
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {schedules.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                No Schedules Yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first protection schedule to automate when face
                recognition is active.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Schedule
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              How Schedules Work
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Multiple schedules can be active simultaneously</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>You can manually override any schedule anytime</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Emergency PIN will work during all protected hours</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Schedule Form Component
interface ScheduleFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSave: () => void;
  onCancel: () => void;
  days: string[];
  dayNames: string[];
  toggleDay: (index: number) => void;
  isEditing?: boolean;
}

function ScheduleForm({
  formData,
  setFormData,
  onSave,
  onCancel,
  days,
  dayNames,
  toggleDay,
  isEditing = false,
}: ScheduleFormProps) {
  const selectedDaysText =
    formData.days
      .map((selected: boolean, index: number) =>
        selected ? dayNames[index] : null,
      )
      .filter(Boolean)
      .join(", ") || "None selected";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Schedule Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Night Protection, Work Hours"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Enable Schedule</Label>
          <p className="text-sm text-muted-foreground">
            Activate this schedule immediately
          </p>
        </div>
        <Switch
          checked={formData.enabled}
          onCheckedChange={(enabled) => setFormData({ ...formData, enabled })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center space-x-1">
            <Moon className="w-4 h-4" />
            <span>Start Time</span>
          </Label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            className="w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center space-x-1">
            <Sun className="w-4 h-4" />
            <span>End Time</span>
          </Label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            className="w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Repeat Days</span>
        </Label>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleDay(index)}
              className={`aspect-square rounded-lg font-semibold text-sm transition-all duration-200 ${
                formData.days[index]
                  ? "bg-primary text-white shadow-md"
                  : "bg-white border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Selected: {selectedDaysText}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Activation Reminder</Label>
          <p className="text-sm text-muted-foreground">
            Notify 10 minutes before activation
          </p>
        </div>
        <Switch
          checked={formData.notifyBeforeActivation}
          onCheckedChange={(notify) =>
            setFormData({ ...formData, notifyBeforeActivation: notify })
          }
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          className="flex-1"
          disabled={!formData.name.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? "Save Changes" : "Create Schedule"}
        </Button>
      </div>
    </div>
  );
}
